import { book, doc_details, hospitalInformation, slotInfo } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { callbackPromise } from "nodemailer/lib/shared/index.js";

export const getDoctorPage = async (req, res) => {
  const { doctoken } = req.cookies;
  if (doctoken) {
    const decodedValue = jwt.verify(doctoken, "doctor");
    const doc_auth = await doc_details.findById(decodedValue._id);
    const request_info = await book.find({
      patienthospital: doc_auth.docworksIn,
      appointmentAccept: true,
      medicines: '',
      appointmentReject: false,
      doctorallocated: doc_auth.doctorname,
    });
    console.log(request_info);
    if (doc_auth) {
      return res.render("doctor.pug", {request_info,username1: request_info.username1, patientage:request_info.patientage, patientname:request_info.patientname, patientlocation:request_info.patientlocation, patientphone:request_info.patientphone});
    }
  } else {
    return res.redirect("/doctorlogin");
  }
};

export const doctorLoginPug = (req, res) => {
  res.render("doctorlogin.pug");
};

export const doctorRegisterPug = (req, res) => {
  res.render("doctorregister.pug");
};

// export const viewIncomingAppointments = async (req, res) => {
//   const { doctoken } = req.cookies;
//   if (doctoken) {
//     const decodedValue = jwt.verify(doctoken, "doctor");
//     const find_doc = await doc_details.findById(decodedValue._id);
//     const results = await fetchappointments(find_doc.docworksIn);
//     console.log(find_doc.worksIn);
//     // console.log(`${results.length} appointments found`);
//     // console.log(results);
//     res.render("staffhistory.pug", {
//       results, // Pass the results to the Pug template
//     });

//     // renderAppointments(results);
//   } else {
//     const message = "Login first to access the appointment history";
//     res.render("stafflogin.pug", { message });
//   }
// };
// const fetchappointments = async (location) => {
//   try {
//     const bookings = await book.find({
//       patienthospital: location,
//       appointmentAccept: true,
//     });
//     console.log(bookings);
//     return bookings;
//   } catch (err) {
//     console.error(err);
//     return []; // Return an empty array if there's an error
//   }
// };


// export const medicines = async (req,res) => {
//   const{username1,patientname,patientage,patientlocation,patientphone,medicines,morning,afternoon,evening,night,duration} = req.body;
//   const morn = morning === 'on' ? 'morning,' : '';
//   const noon = afternoon === 'on' ? 'afternoon,' : '';
//   const eve = evening === "on" ? "evening," : "";
//   const nite = night === 'on' ? 'night' : '';
//   const prescription = `${medicines} for ${duration} days . Take in ${morn}${noon}${eve}${nite}`;
//   // const prescriptions = medicines.map((medicine)=>(
//   //   `${medicine} for ${duration} days . Take in ${morn}${noon}${eve}${nite}`
//   // )).reduce((a,b)=>(a+b))
  
//   console.log(prescription);
//   console.log("userdata", {
//     username1: username1,
//     patientphone: patientphone,
//     patientname: patientname,
//     patientage: patientage,
//   });
//   await book.findOneAndUpdate(
//       {
//         username1:username1,
//         patientphone: patientphone,
//         patientname: patientname,
//         patientage: patientage,
//       },
//       {$set: {medicines: prescription}
//     }
//     )
//     .then((res) => {
//       console.log("data updated successfully",res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
    
//   res.redirect('/getDoctorPage');
// };

export const postDocRegister = async (req, res) => {
  const {
    doctorname,
    doctorstate,
    doctorcity,
    docworksIn,
    doctorcontact,
    doctoremail,
    doctorpassword,
    doctorpasswordverify,
  } = req.body;
  const userexists = await doc_details.findOne({ doctorname });
  if (userexists) {
    console.log("username already equipped, choose a new one");
    const message = "Please use another username";
    return res.render("doctorregister.pug", {
      doctoremail,
      doctorcontact,
      doctorcity,
      error1: message,
    });
  }
  if (doctorpassword != doctorpasswordverify) {
    const message = "Please verify your password correctly";
    return res.render("doctorregister.pug", {
      doctoremail,
      doctorcontact,
      doctorcity,
      error2: message,
    });
  } else {
    const hashpassword = await bcrypt.hash(doctorpassword, 10);
    const docdata = {
      doctorname,
      doctorstate,
      doctorcity,
      docworksIn,
      doctorcontact,
      doctoremail,
      doctorpassword: hashpassword,
      doctorpasswordverify: doctorpassword,
    };
    const docObject = new doc_details(docdata);
    await docObject.save();
    const tokenValue = jwt.sign({ _id: docObject._id }, "doctor");
    res.cookie("doctoken", tokenValue);
    res.redirect(`/getDoctorPage`);
  }
};

export const postDocLogin = async (req, res) => {
  const { doctorname, doctorpassword } = req.body;
  const docfind = await doc_details.findOne({ doctorname });
  if (!docfind) {
    return res.redirect("/doctorregister");
  }
  const isMatch = await bcrypt.compare(doctorpassword, docfind.doctorpassword);
  if (!isMatch) {
    const mesage = "enter correct password";
    console.log("enter correct password");
    return res.render("doctorlogin.pug", { doctorname, message: mesage });
  } else {
    const tokenValue = jwt.sign({ _id: docfind._id }, "doctor");
    res.cookie("doctoken", tokenValue); // one week
    res.redirect(`/getDoctorPage`);
  }
};


export const fetchDoctors = async(req,res) => {  
  try{
    const filter = req.query.doctortoken;
    const data = await doc_details.find({docworksIn:filter,availability:true});
    res.send(data); 
  }
  catch (error){
     console.error(error);
     res.status(500).send("Internal Server Error");
  }
};

export const fetchSlots = async(req,res)=>{
  try {
   const filter = req.query.value;
   const slotinfo = await slotInfo.find({
     hospital_name: filter,
   });
   console.log(slotinfo);
   res.send(slotinfo); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


export const available = async(req,res)=>{
  res.render('docAvailable.pug');
}

export const avai_True = async(req,res)=> {
  const {doctoken} = req.cookies;
  const decodedValue = jwt.verify(doctoken, "doctor");
  await doc_details.findByIdAndUpdate(decodedValue._id,{availability:true});
  res.redirect('/getAvailablePages');
}
export const avai_False = async(req,res)=> {
  const {doctoken} = req.cookies;
  const decodedValue = jwt.verify(doctoken, "doctor");
  await doc_details.findByIdAndUpdate(decodedValue._id,{availability:false});
  res.redirect("/getAvailablePages");
}

export const medicines = async (req, res) => {
  const PName = req.query.ptname;
  const PAge = parseInt(req.query.ptage);
  const PTel = Number(req.query.pttel);
  const str = req.query.strValue;
  console.log('user',{
    name:PName,
    age:PAge,
    tel:PTel,
    search:str
  })
  // const prescriptions = medicines.map((medicine)=>(
  //   `${medicine} for ${duration} days . Take in ${morn}${noon}${eve}${nite}`
  // )).reduce((a,b)=>(a+b))
  await book
    .findOneAndUpdate(
      {
        patientphone: PTel,
        patientname: PName,
        patientage: PAge,
      },
      { $set: { medicines: str } }
    )
    .sort({ _id: -1 })
    .then((res) => {
      console.log("data updated successfully", res);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/getDoctorPage");
};

export const stats = (req,res) => {
  res.render('stats.pug');
}

export const statistics = async(req,res) => {
  try{
    const filter = req.query.doctor;
    console.log(filter);
    const search = await book.find({ doctorallocated: filter, auth: true });
    console.log(search);
    res.send(search);
  }
  catch(err){
    console.error(err);
  }
}


// export const statistics = async(req,res) => {
//   let searchResult = {};
//   const pipeline = [
//     {
//       $match: { doctorallocated: req.query.doctor, auth: true },
//     },
//     {
//       $group: {
//         _id: {
//           $dateToString: {
//             format: "%Y-%m-%d",
//             date: "$patientdate",
//           },
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         date: "$_id",
//         count: 1,
//       }
//     }
//   ];
  

//   book.aggregate(pipeline)
//     .then((result) => {
//       // Store the dictionary-like object in the global variable
//       searchResult = result.reduce((acc, cur) => {
//         acc[cur.date] = cur.count;
//         return acc;
//       }, {});

//       // Print the dictionary-like object
//       console.log(searchResult);
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//     });
//   // book.aggregate(pipeline, (err,result)=>{
//   //   if (err) {
//   //     console.log(err);
//   //   }
//   //   else{
//   //     searchResult = result.reduce((acc,cur) => {
//   //       acc[cur.date]=cur.count;
//   //       return acc;
//   //     },{});
//   //   }
//   // });
//   console.log('lorem123456789');
//   console.log(searchResult);
//   res.send('success');
// }


// export const statistics = async (req, res) => {
//   let searchResult = {};
//   const pipeline = [
//     {
//       $match: { doctorallocated: req.query.doctor, auth: true },
//     },
//     {
//       $group: {
//         _id: {
//           $dateToString: {
//             format: "%Y-%m-%d",
//             date: "$patientdate",
//           },
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         date: "$_id",
//         count: 1,
//       },
//     },
//   ];

//   book
//     .aggregate(pipeline)
//     .then((result) => {
//       // Store the dictionary-like object in the global variable
//       searchResult = result.reduce((acc, cur) => {
//         acc[cur.date] = cur.count;
//         return acc;
//       }, {});
//       console.log(searchResult);
//       // Return the dictionary-like object as a response
//       res.json(searchResult);
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       res.status(500).send("Internal Server Error");
//     });
// };