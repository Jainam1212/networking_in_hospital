const abc = require('../app');

// const appoint=abc.appointmetHandler
// const appointments = abc.appointmentList;
// const modifiedAppointments = appointments.map((appointment) => {
//   return appointment;
// });

// console.log(appoint);
// console.log(appointments);
// console.log(modifiedAppointments);
import { appointmentList } from '../controllers/user';

//   const table = document.getElementById(tableId);
const tbody = document.querySelector('#appointment_data tbody');

appointmentList.forEach((appointment) => {
  // THIS CODE DOESNOT WORK BECAUSE, WE CAN'T CHANGE THE DOM ON THE SERVER, FIRST WE HAVE TO LET THE DOM RENDER, AND THE WE CAN MANIPULATE IT IN THE PUG FILE.
  console.log('in appointment data');
  console.log(appointment);
  const tr = document.createElement('tr');

  const patient = document.createElement('td');
  patient.textContent = appointment.patientname;
  tr.appendChild(patient);

  const age = document.createElement('td');
  age.textContent = appointment.patientage;
  tr.appendChild(age);

  const phoneNo = document.createElement('td');
  phoneNo.textContent = appointment.patientphone;
  tr.appendChild(phoneNo);

  const hospitalName = document.createElement('td');
  hospitalName.textContent = appointment.patienthospital;
  tr.appendChild(hospitalName);

  const doctor = document.createElement('td');
  doctor.textContent = appointment.patientneed;
  tr.appendChild(doctor);

  const date = document.createElement('td');
  date.textContent = appointment.patientdate;
  tr.appendChild(date);

  const time = document.createElement('td');
  time.textContent = appointment.patienttime;
  tr.appendChild(time);

  tbody.appendChild(tr);
});
// res.render('appointments.pug', {
//   patient_name: abc.username,
// });
