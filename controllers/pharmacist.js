import { book, staff_details, hospitalInformation } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getPharmacistPage = async (req, res) => {
  const { pharmacisttoken } = req.cookies;
  if (pharmacisttoken) {
    const decodedValue = jwt.verify(pharmacisttoken, "staff");
    const staff_authentication = await staff_details.findById(decodedValue._id);
    const hospital_info = await hospitalInformation.find({
      hospitalname: staff_authentication.worksIn,
    });
    const request_info = await book.find({
      patienthospital: staff_authentication.worksIn,
      appointmentAccept: true,
      appointmentReject: false,
      medicineAccept: false,
      medicineReject:false,
      medicines:{$ne: ''},
    });
    if (staff_authentication) {
      return res.render("pharmacist.pug", { hospital_info, request_info });
    }
  } else {
    return res.redirect("/pharmacistlogin");
  }
};

export const pharmacistLoginPug = (req, res) => {
  res.render("pharmacistlogin.pug");
};

export const pharmacistRegisterPug = (req, res) => {
  res.render("pharmacistregister.pug");
};

export const viewHistory = async (req, res) => {
  const { pharmacisttoken } = req.cookies;
  if (pharmacisttoken) {
    const decodedValue = jwt.verify(pharmacisttoken, "staff");
    const find_staff = await staff_details.findById(decodedValue._id);
    const results = await fetchappointments(find_staff.worksIn);
    console.log(find_staff.worksIn);
    // console.log(`${results.length} appointments found`);
    // console.log(results);
    res.render("staffhistory.pug", {
      results, // Pass the results to the Pug template
    });

    // renderAppointments(results);
  }
};
const fetchappointments = async (location) => {
  try {
    const bookings = await book.find({
      patienthospital: location,
      appointmentAccept: true,
      medicineAccept: true,
      medicineReject: false,
    });
    console.log(bookings);
    return bookings;
  } catch (err) {
    console.error(err);
    return []; // Return an empty array if there's an error
  }
};

export const postpharmacistregister = async (req, res) => {
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
    return res.render("pharmacistregister.pug", {
      staffemail,
      staffcontact,
      staffcity,
      error1: message,
    });
  }
  if (staffpassword != staffpasswordverify) {
    const message = "Please verify your password correctly";
    return res.render("pharmacistregister.pug", {
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
      staffpassword: hashpassword,
      staffpasswordverify: staffpassword,
    };
    const staffObject = new staff_details(userdata);
    await staffObject.save();
    const tokenValue = jwt.sign({ _id: staffObject._id }, "staff");
    res.cookie("pharmacisttoken", tokenValue);
    res.redirect(`/getPharmacistPage`);
  }
};

export const postpharmacistlogin = async (req, res) => {
  const { staffname, staffpassword } = req.body;
  const userfind = await staff_details.findOne({ staffname });
  if (!userfind) {
    return res.redirect("/pharmacistregister");
  }
  const isMatch = await bcrypt.compare(staffpassword, userfind.staffpassword);
  if (!isMatch) {
    const mesage = "enter correct password";
    console.log("enter correct password");
    return res.render("pharmacistlogin.pug", { staffname, message: mesage });
  } else {
    const tokenValue = jwt.sign({ _id: userfind._id }, "staff");
    res.cookie("pharmacisttoken", tokenValue); // one week
    res.redirect(`/getPharmacistPage`);
  }
};

export const medAccept = async (req, res) => {
  try {
    console.log(req.body);
    const itemID = req.params.id;
    // const result = JSON.parse(req.params.appointmentAccept);
    // console.log(result);
    // console.log(req.body.appointmentAccept.toString());
    const updatedItem = await book.findByIdAndUpdate(itemID, {
      medicineAccept: true,
    });
    // console.log(updatedItem);
    if (!updatedItem) {
      return res.status(404).send("item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const medDecline = async (req, res) => {
  try {
    // console.log("false block");
    const itemID = req.params.id;
    const updatedItem = await book.findByIdAndUpdate(itemID, {
      medicineReject: true,
    });
    // console.log(updatedItem);
    if (!updatedItem) {
      return res.status(404).send("item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
