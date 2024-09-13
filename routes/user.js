import express from 'express';
// import { login_register } from "../models/user.js";
import {
  getContactPage,
  getHomePage,
  getTreatmentPage,
  getWelcomePage,
  patientLoginPug,
  patientRegisterPug,
  postContactPage,
  postPatientLogin,
  postPatientRegister,
  logoutuser,
  getVerifyPage,
  postVerifyPage,
  einstien,
  pharmasy,
} from '../controllers/user.js';

import { getAppointmentPage } from '../controllers/appointment.js';
import { getStaffPage, postSlots, postStaffLogin, postStaffRegister, requestAccept, requestDecline, slotUpdatePage, slotsPage, staffLoginPug, staffRegisterPug, updatingSlot, viewHistory } from '../controllers/staff.js';
import { avai_False, avai_True, available, doctorLoginPug, doctorRegisterPug, fetchDoctors, fetchSlots, getDoctorPage, medicines, postDocLogin, postDocRegister, statistics, stats } from '../controllers/doctor.js';
import { getPharmacistPage, medAccept, medDecline, pharmacistLoginPug, pharmacistRegisterPug, postpharmacistlogin, postpharmacistregister } from '../controllers/pharmacist.js';

const router = express.Router();

router.get('/', getWelcomePage);

router.get("/getIndexPage", getHomePage);

router.get('/patientlogin', patientLoginPug);

router.get('/patientregister', patientRegisterPug);

router.get('/home', getHomePage);

router.get('/logout',logoutuser);

router.get('/treatment', getTreatmentPage);

router.get('/contact', getContactPage);

router.get('/appointments', getAppointmentPage);

router.get('/getStaffPage',getStaffPage);

router.get('/stafflogin',staffLoginPug);

router.get('/staffregister',staffRegisterPug);

router.get('/staffHistory',viewHistory);

router.get('/getDoctorPage',getDoctorPage);

router.get('/doctorregister',doctorRegisterPug);

router.get('/doctorlogin',doctorLoginPug);

router.get('/getPharmacistPage',getPharmacistPage);

router.get('/pharmacistlogin',pharmacistLoginPug);

router.get('/pharmacistregister', pharmacistRegisterPug);

router.get('/getVerificationPage', getVerifyPage);

router.get('/manageAppointments',slotsPage);

router.get('/getData',fetchDoctors);

router.get('/saveData',medicines);

router.get('/getSlot',fetchSlots);

router.get('/getAvailablePages',available);

router.get('/updateSlots',slotUpdatePage);

router.get('/reloadStaff',getStaffPage);

router.get('/getStatPage',statistics);

router.get('/getStat',stats);

router.get('/chatWithAi',einstien);

router.get('/pharmacy',pharmasy);

router.post('/contact', postContactPage);

router.post('/patientregister', postPatientRegister);

router.post('/patientlogin', postPatientLogin);

router.post('/poststafflogin',postStaffLogin);

router.post('/poststaffregister',postStaffRegister);

router.post('/postdoctorlogin',postDocLogin);

router.post('/postdoctorregister',postDocRegister);

router.post('/postMedicine',medicines);

router.post('/postpharmacistlogin',postpharmacistlogin);

router.post('/postpharmacistregister',postpharmacistregister);

router.post('/verifysubmit', postVerifyPage);

router.post('/postSlotInfo',postSlots );

router.post('/updateSlotInfo',updatingSlot);

router.post('/makeAvailable',avai_True);

router.post('/makeUnavailable',avai_False);

router.put('/request_info/:id',requestAccept);

router.put('/request_decline/:id',requestDecline);

router.put("/med_info/:id", medAccept);

router.put("/med_decline/:id", medDecline);

export default router;
