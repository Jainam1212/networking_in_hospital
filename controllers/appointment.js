import { book, login_register } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const getAppointmentPage = async (req, res) => {
  const { usertoken } = req.cookies;
  if (usertoken) {
    const decodedValue = jwt.verify(usertoken, 'abcdef');
    const abc = await login_register.findById(decodedValue._id);
    const appointmentList = await getAppointments(abc.username);
    const button = "LOG OUT";
    const linkhref = "/logout";
    console.log(`${appointmentList.length} appointments found`);
    console.log(appointmentList);
    res.render("appointments.pug", {
      buttonname: button,
      getlink: linkhref,
      patient_name: abc.username,
      appointmentList, // Pass the appointmentList to the Pug template
    });

    // renderAppointments(appointmentList);
  } else {
    const message = 'Login first to access the appointment history';
    res.render('patientlogin.pug', { message });
  }
};

// Function to retrieve appointments for a given username
const getAppointments = async (username) => {
  try {
    const bookings = await book.find({ username1: username,appointmentAccept:true });
    return bookings;
  } catch (err) {
    console.error(err);
    return []; // Return an empty array if there's an error
  }
};

