import { book, doc_details, login_register, slotInfo } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import twilio from 'twilio';
import pkg from 'natural';
const {BayesClassifier} = pkg;
config();

export const getWelcomePage = (req,res) => {
  res.render( 'welcome.pug');
};

export const getIndexPage = (req, res) => {
  res.render('index.pug');
};

export const patientLoginPug = (req, res) => {
  res.render('patientlogin.pug');
};
export const pharmasy = (req,res) => {
  res.render('pharm.pug');
}

export const logoutuser = async(req,res) => {
  const { usertoken } = req.cookies;
  res.clearCookie('usertoken');
  // console.log("Logged out",usertoken);
  res.redirect('/home');
}

export const patientRegisterPug = (req, res) => {
  const {usertoken} = req.cookies;
  if(usertoken){
    // signupalertbox();
    res.render('index.pug');
  }
  else{
    res.render('patientregister.pug');
  }
};

export const getHomePage = async (req, res) => {

  const { usertoken } = req.cookies;
  // console.log('usertoken',usertoken);
  if (usertoken) {
    const decodedValue = jwt.verify(usertoken, 'abcdef');
    req.user = await login_register.findById(decodedValue._id);
    const button = "LOG OUT";
    const linkhref = "/logout";
    res.render("index.pug", {
      patient_name: req.user.username,
      buttonname: button,
      getlink: linkhref,
    });
  } else {
    const button = "SIGN UP";
    const linkhref = "/patientlogin";
    res.render('index.pug', {
      buttonname: button,
      getlink: linkhref,
    });
  }
};

export const getTreatmentPage = (req, res) => {
  const { usertoken } = req.cookies;
  if (usertoken) {
    const button = "LOG OUT";
    const linkhref = "/logout";
    res.render("treatment.pug", {
      buttonname: button,
      getlink: linkhref,
    });
  } else {
    const button = "SIGN UP";
    const linkhref = "/patientlogin";
    res.render('treatment.pug', {
      buttonname: button,
      getlink: linkhref,
    });
  }
};

export const getContactPage = (req, res) => {
  const { usertoken } = req.cookies;
  const value = req.query.variableName;
  if (usertoken) {
    const button = "LOG OUT";
    const linkhref = "/logout";
    res.render("contact.pug", {
      buttonname: button,
      getlink: linkhref,
      message:value
    });
  } else {
    const button = "SIGN UP";
    const linkhref = "/patientlogin";
    res.render("contact.pug", {
      buttonname: button,
      getlink: linkhref,
      message: value,
    });
  }
};

export const getVerifyPage = (req,res) => {
  const {authtoken} = req.cookies;
  if (authtoken) {
    res.render('verification.pug');
  }
  else{
    res.redirect('/home');
  }
}

export const postVerifyPage = async(req,res) => {
  const email = req.cookies.authtoken;
  const code = req.body.verifycode;
  if (!email) {
    return res.redirect('/home');
  }
  const search_result = await book.findOne({patientemail:email}).sort({_id:-1});
  const date = search_result.patientdate;
  const time = search_result.patienttime;
  const hospital = search_result.patienthospital;
  const doc = search_result.doctorallocated;
  if (code==search_result.verification) {
    const update_result =await book.findOneAndUpdate({verification:code,patientemail:email},{auth:true});
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "medwelljunction@gmail.com",
        pass: "bknuioewvrkobjls",
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: search_result.patientemail,
      subject: `Appointment Booking for ${search_result.patientname}`,
      text: `${search_result.patientname} your appointment with Doctor ${doc} has been scheduled at ${time}, on ${date}, in ${hospital}`,
    });
    const accountSid = "AC0d17c87cdadef30aaaf7305648eb2daf";
    const authToken = "e838b8ce9e9c099cc27300e26420a24b";
    const client = twilio(accountSid, authToken);
    client.messages
      .create({
        body: `Patient named ${search_result.patientname} has booked an appointment at ${time}, on ${date}, in ${hospital}`,
        from: "+13343264152",
        to: "+917863085545",
      })
      .then((message) =>
        console.log(`message sent successfully. Message id: ${message.sid}`)
      )
      .catch((error) => {
        console.log(error);
      });


    res.clearCookie('authtoken');
    if (update_result) {
      console.log("update successful");
    }
  }
  else{
   return res.render('verification.pug',{message: 'enter correct verification code'});
  }
  res.redirect('/home');
}

export const postContactPage = async (req, res) => {
  const { usertoken } = req.cookies;
  if (usertoken) {
    const verificationCode = Math.floor(100000 + Math.random()*900000);
    const decodedValue = jwt.verify(usertoken, 'abcdef');
    req.user = await login_register.findById(decodedValue._id);
    const patientDetails = {
      username1: req.user.username,
      patientname: req.body.patientname,
      patientage: req.body.patientage,
      patientlocation: req.body.patientlocation,
      patientphone: req.body.patientphone,
      patientemail: req.body.patientemail,
      patienthospital: req.body.patienthospital,
      patientneed: req.body.patientneed,
      doctorallocated: req.body.doctorallocated,
      patientdate: req.body.patientdate,
      patienttime: req.body.patienttime,
      appointmentAccept: false,
      appointmentReject: false,
      medicineAccept: false,
      medicineReject: false,
      verification: verificationCode,
      auth: false,
      userThought:req.body.feelSlider,
    };
    try{
      function check (){
        if (req.body.patientdate != null) {
        var inputDate = new Date(req.body.patientdate);
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate()+3);
        if (inputDate >= currentDate) {
          return false;
        }
        
        return true;
      }
      }
      if(check()==false){
        const err_msg = "Booking for more than 3 days isn't allowed";
        return res.redirect(
          "/contact?variableName=" + encodeURIComponent(err_msg)
        );
      }else{
        console.log('date is acceptable');
      }
    }catch(error){
      console.log(error);
    }

    const appointmentObject = new book(patientDetails);
    const slot_result = await slotInfo.findOne({hospital_name:req.body.patienthospital,time:req.body.patienttime})
    console.log(slot_result);
    console.log(req.body.patienttime);
    if (!slot_result) {
      const err_msg = "slots not available in time you selected";
      return res.redirect("/contact?variableName=" + encodeURIComponent(err_msg));
    } else if (slot_result.slot == 0) {
      const err_msg = "slots not available in time you selected";
      return res.redirect("/contact?variableName=" + encodeURIComponent(err_msg));
    } else {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "medwelljunction@gmail.com",
          pass: "bknuioewvrkobjls",
        },
      });
      await transporter.sendMail({
        from: "medwelljunction@gmail.com",
        to: req.body.patientemail,
        subject: "Appointment Verification Code",
        text: `your 6-digit otp for appointment is  ${verificationCode}, enter it in verification page of our website to book an appointment`,
      });
      res.cookie("authtoken", req.body.patientemail, {
        expires: new Date(Date.now() + 2 * 60 * 1000),
      });
      const num = slot_result.slot - 1;
      console.log(num);
      console.log(slot_result._id);
      const updatedItem = await slotInfo.findByIdAndUpdate(slot_result._id, {
        slot: num,
      });
      if (updatedItem) {
        console.log("update successful");
      } else console.log("error occured");
      await appointmentObject.save();
      return res.redirect("/getVerificationPage");
    }
    
    

    // const accountSid = "AC0d17c87cdadef30aaaf7305648eb2daf";
    // const authToken = "e838b8ce9e9c099cc27300e26420a24b";
    // const client = twilio(process.env.accountSid,process.env.authToken);
    // const client = twilio(accountSid,authToken);
    // client.messages
    //   .create({
    //     body: "",
    //     from: "+13343264152",
    //     to: "+917863085545",
    //   })
    //   .then((message) => console.log(message.sid))
    //   .catch((error)=>{console.log(error)});
    // client.messages.create({
    //   body:`your verification code is ${verificationCode}`,
    //   from: '+13343264152',
    //   to: '+917863085545'
    // }).then(message => console.log(message.sid)).catch((error) =>{
    //   console.log(error);
    // });

  } else {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const patientDetails = {
      username1: null,
      patientname: req.body.patientname,
      patientage: req.body.patientage,
      patientlocation: req.body.patientlocation,
      patientphone: req.body.patientphone,
      patientemail: req.body.patientemail,
      patienthospital: req.body.patienthospital,
      patientneed: req.body.patientneed,
      patientdate: req.body.patientdate,
      doctorallocated: req.body.doctorallocated,
      patienttime: req.body.patienttime,
      appointmentAccept: false,
      appointmentReject: false,
      medicineAccept: false,
      medicineReject: false,
      verification: verificationCode,
      auth: false,
    };

    try {
      function check() {
        if (req.body.patientdate != null) {
          var inputDate = new Date(req.body.patientdate);
          var currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 3);
          if (inputDate >= currentDate) {
            return false;
          }

          return true;
        }
      }
      if (check() == false) {
        const err_msg = "Booking for more than 3 days isn't allowed";
        return res.redirect(
          "/contact?variableName=" + encodeURIComponent(err_msg)
        );
      } else {
        console.log("date is acceptable");
      }
    } catch (error) {
      console.log(error);
    }

    const appointmentObject = new book(patientDetails);
    const slot_result = await slotInfo.findOne({
      hospital_name: req.body.patienthospital,
      time: req.body.patienttime,
    });
    if (!slot_result) {
      const err_msg = "slots not available in time you selected";
      res.redirect("/contact?variableName=" + encodeURIComponent(err_msg));
    } else if (slot_result.slot == 0) {
      const err_msg = "slots not available in time you selected";
      res.redirect("/contact?variableName=" + encodeURIComponent(err_msg));
    } else {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "medwelljunction@gmail.com",
          pass: "bknuioewvrkobjls",
        },
      });
      await transporter.sendMail({
        from: "medwelljunction@gmail.com",
        to: req.body.patientemail,
        subject: "Appointment Verification Code",
        text: `your 6-digit otp for appointment is  ${verificationCode}, enter it in verification page of our website to book an appointment`,
      });
      res.cookie("authtoken", req.body.patientemail, {
        expires: new Date(Date.now() + 2 * 60 * 1000),
      });
      const num = slot_result.slot - 1;
      console.log(num);
      console.log(slot_result._id);
      const updatedItem = await slotInfo.findByIdAndUpdate(slot_result._id, {
        slot: num,
      });
      if (updatedItem) {
        console.log("update successful");
      } else console.log("error occured");
      await appointmentObject.save();
      return res.redirect("/getVerificationPage");
    }
  }
};

export const postPatientRegister = async (req, res) => {
  const {
    username,
    stateselect,
    city,
    email,
    phone,
    password,
    passwordverify,
  } = req.body;
  const userexists = await login_register.findOne({ username });
  if (userexists) {
    console.log('username already equipped, choose a new one');
    const message = 'Please use another username';
    return res.render('patientregister.pug', {
      email,
      phone,
      error1: message,
    });
  }
  if (password != passwordverify) {
    const message = 'Please verify your password correctly';
    return res.render('patientregister.pug', {
      email,
      phone,
      error2: message,
    });
  } else {
    const hashpassword = await bcrypt.hash(password, 10);
    const userdata = {
      username,
      stateselect,
      city,
      email,
      phone,
      password: hashpassword,
      passwordverify: password,
    };
    const login_registerObj = new login_register(userdata);
    await login_registerObj.save();
    const tokenValue = jwt.sign({ _id: login_registerObj._id }, 'abcdef');
    res.cookie("usertoken", tokenValue);
    res.redirect(`/home`);
  }
};

export const postPatientLogin = async (req, res) => {
  const { username, password } = req.body;
  const userfind = await login_register.findOne({ username });
  if (!userfind) {
    return res.redirect('/patientregister');
  }
  const isMatch = await bcrypt.compare(password, userfind.password);
  if (!isMatch) {
    const mesage = 'enter correct password';
    console.log('enter correct password');
    return res.render('patientlogin.pug', { username, message: mesage });
  } else {
    const tokenValue = jwt.sign({ _id: userfind._id }, 'abcdef');
    res.cookie('usertoken', tokenValue); // one week
    res.redirect(`/home`);
  }
};

export const einstien = (req,res)=>{
  const classifier = new BayesClassifier();
  classifier.addDocument(["fever", "cough"], "flu");
  classifier.addDocument(["headache", "sore throat"], "common cold");
  classifier.addDocument(["fever", "rash"], "measles");
  classifier.addDocument(["swelling", "fever"], "arthritis");
  classifier.addDocument(["pain", "weakness"], "hypotension");
  classifier.addDocument(["weakness", "cold"], "malaria");
  classifier.addDocument(["faint", "weakness"], "anemia");
  classifier.addDocument(["headache", "fever"], "Rabis");
  classifier.addDocument(["skin eruption", "fever"], "ckicken pox");
  classifier.addDocument(["headache", "nasal congestion"], "sinusitis");
  classifier.train();

  const symp = req.query.value;
  const processedSymp = symp.toLowerCase().split(',');
  const prediction = classifier.classify(processedSymp)
  res.send(prediction);
}