import { book, staff_details,hospitalInformation, slotInfo } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getStaffPage = async(req, res) => {
  const {stafftoken} = req.cookies;
  if (stafftoken) {
    const decodedValue = jwt.verify(stafftoken, "staff");
    const staff_authentication = await staff_details.findById(decodedValue._id);
    const hospital_info = await hospitalInformation.find({hospitalname:staff_authentication.worksIn});
    const request_info = await book.find({patienthospital: staff_authentication.worksIn, appointmentAccept:false,appointmentReject: false, auth:true});
    if (staff_authentication) {
      return res.render("staffAccept.pug",{hospital_info,request_info});
    }
  }
  else {
    return res.redirect("/stafflogin");
  }
};

export const staffLoginPug = (req, res) => {
  res.render("stafflogin.pug");
};

export const staffRegisterPug = (req, res) => {
    res.render("staffregister.pug");
};

export const viewHistory = async(req,res) => {
  const { stafftoken } = req.cookies;
  if (stafftoken) {
    const decodedValue = jwt.verify(stafftoken, 'staff');
    const find_staff = await staff_details.findById(decodedValue._id);
    const results = await fetchappointments(find_staff.worksIn);
    console.log(find_staff.worksIn);
    // console.log(`${results.length} appointments found`);
    // console.log(results);
    res.render('staffhistory.pug', {
      results // Pass the results to the Pug template
    });

    // renderAppointments(results);
  } else {
    const message = 'Login first to access the appointment history';
    res.render('stafflogin.pug', { message });
  }
};
const fetchappointments = async (location) => {
  try {
    const bookings = await book.find({
      patienthospital: location,
      appointmentAccept: true,
    });
    console.log(bookings);
    return bookings;
  } catch (err) {
    console.error(err);
    return []; // Return an empty array if there's an error
  }
};

export const postStaffRegister = async (req, res) => {
  const {
    staffname,
    staffstate,
    staffcity,
    worksIn,
    staffcontact,
    staffemail,
    staffpassword,
    staffpasswordverify,
  } = req.body;
  const userexists = await staff_details.findOne({ staffname });
  if (userexists) {
    console.log("username already equipped, choose a new one");
    const message = "Please use another username";
    return res.render("staffregister.pug", {
      staffemail,
      staffcontact,
      staffcity,
      error1: message,
    });
  }
  if (staffpassword != staffpasswordverify) {
    const message = "Please verify your password correctly";
    return res.render("staffregister.pug", {
      staffemail,
      staffcontact,
      staffcity,
      error2: message,
    });
  } else {
    const hashpassword = await bcrypt.hash(staffpassword, 10);
    const userdata = {
      staffname,
      staffstate,
      staffcity,
      worksIn,
      staffcontact,
      staffemail,
      staffpassword : hashpassword,
      staffpasswordverify :staffpassword,
    };
    const staffObject = new staff_details(userdata);
    await staffObject.save();
    const tokenValue = jwt.sign({ _id: staffObject._id }, "staff");
    res.cookie("stafftoken", tokenValue);
    res.redirect(`/getStaffPage`);
  }
};

export const postStaffLogin = async (req, res) => {
  const { staffname, staffpassword } = req.body;
  const userfind = await staff_details.findOne({ staffname });
  if (!userfind) {
    return res.redirect("/staffregister");
  }
  const isMatch = await bcrypt.compare(staffpassword, userfind.staffpassword);
  if (!isMatch) {
    const mesage = "enter correct password";
    console.log("enter correct password");
    return res.render("stafflogin.pug", { staffname, message: mesage });
  } else {
    const tokenValue = jwt.sign({ _id: userfind._id }, "staff");
    res.cookie("stafftoken", tokenValue); // one week
    res.redirect(`/getStaffPage`);
  }
};

export const requestAccept = async (req,res) => {
  try {
    console.log(req.body);
    const itemID = req.params.id;
    console.log(req.params.id);
    const updatedItem = await book.findByIdAndUpdate(
      itemID,
      { appointmentAccept: true }
    );
    if (!updatedItem) {
      return res.status(404).send("item not found");
    }
    return res.render('staffAccept.pug');
  } catch (error) {
    res.status(500).send(error);
  }
};

export const requestDecline = async(req,res) => {
  try {
    // console.log("false block");
    const itemID = req.params.id;
    const updatedItem = await book.findByIdAndUpdate(
      itemID, 
      { appointmentReject: true }
    );
    // console.log(updatedItem);
    if (!updatedItem) {
      return res.status(404).send("item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


export const slotsPage = (req,res)=>{
  const err = req.query.variableName;
  let linkhref = "/postSlotInfo";
  const msg = 'If you want to update slots click' ;
  const link = '/updateSlots'
  res.render('manageAppointment.pug',{
    error: err,
    link: linkhref,
    message: msg,
    ahref: link,
  });
}
export const slotUpdatePage = (req,res)=>{
  let linkhref = "/updateSlotInfo";
  const msg = 'If you want to insert slot click';
  const link = "/manageAppointments";
  res.render("manageAppointment.pug", {
    link: linkhref,
    message: msg,
    ahref: link,
  });
}

export const updatingSlot = async(req,res)=>{
  const { stafftoken } = req.cookies;
  const decodedValue = jwt.verify(stafftoken, "staff");
  const staff_authentication = await staff_details.findById(decodedValue._id);
  // console.log(staff_authentication.worksIn,req.body.slot,req.body.time);
  const search_slot = await slotInfo.findOne({
    hospital_name: staff_authentication.worksIn,
    time: req.body.time,
  });
  console.log("hello");
  const err_msg = "Slot donot exists, Insert it first";
  if (!search_slot) {
    return res.redirect(
      "/manageAppointments?variableName=" + encodeURIComponent(err_msg)
      );
    }
    await slotInfo.findOneAndUpdate({hospital_name: staff_authentication.worksIn,time:req.body.time},{slot:req.body.slot},{new:true});
    res.redirect('/updateSlots');
}

export const postSlots = async(req,res)=>{
  const {stafftoken} = req.cookies;
  const decodedValue = jwt.verify(stafftoken, "staff");
  const staff_authentication = await staff_details.findById(decodedValue._id);
  const search_slot = await slotInfo.findOne({hospital_name:staff_authentication.worksIn,time:req.body.time});
  const err_msg='Slot already exists, Update for Change';
  if (search_slot) {
    return res.redirect(
      "/manageAppointments?variableName=" + encodeURIComponent(err_msg)
    );
  }

  await slotInfo.create({hospital_name:staff_authentication.worksIn,slot:req.body.slot,time:req.body.time});
  res.redirect('/manageAppointments');
}