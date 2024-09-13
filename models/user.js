import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  username: String,
  stateselect: String,
  city: String,
  email: String,
  phone: Number,
  password: String,
  passwordverify: String,
});

const extendedPatientSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
  },
  username: String,
  stateselect: String,
  city: String,
  email: String,
  phone: Number,
  password: String,
  passwordverify: String,
});

const appointmentSchema = new mongoose.Schema({
  username1: String,
  patientname: String,
  patientage: Number,
  patientlocation: String,
  patientphone: Number,
  patientemail: String,
  patienthospital: String,
  patientneed: { type: String, default: "" },
  patientdate: Date,
  patienttime: String,
  appointmentAccept: Boolean,
  appointmentReject: Boolean,
  doctorallocated: { type: String, default: "" },
  medicines: { type: String, default: "" },
  medicineAccept: Boolean,
  medicineReject: Boolean,
  verification: Number,
  auth: Boolean,
  userThought: { type: Number, default: 50 },
});

const staffSchema = new mongoose.Schema({
  staffname: String,
  staffstate: String,
  staffcity:String,
  worksIn: String,
  staffcontact: String,
  staffemail: String,
  staffpassword: String,
  staffpasswordverify: String,
});

const docSchema = new mongoose.Schema({
  doctorname: String,
  doctorstate: String,
  doctorcity: String,
  docworksIn: String,
  doctorcontact: String,
  doctoremail: String,
  doctorpassword: String,
  doctorpasswordverify: String,
  availability:{type:Boolean,default:true}
});

const hospitalSchema = new mongoose.Schema({
  hospitalname: String,
  hospitalid: String,
  hospitallocation: String,
  doctor1: String,
  doctor1info: String,
  doctor1exp: String,
  doctor2: String,
  doctor2info: String,
  doctor2exp: String,
  doctor3: String,
  doctor3info: String,
  doctor3exp: String,
  doctor4: String,
  doctor4info: String,
  doctor4exp: String,
  doctor5: String,
  doctor5info: String,
  doctor5exp: String,
});

const slotsSchema = new mongoose.Schema({
  hospital_name:String,
  slot:Number,
  time:String,
})



const homecare = new mongoose.Schema({
  name:String,
  desc: String,
  rate:Number,
  image: String,
})
const healthcare = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const ayurvediccare = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const skincare = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const diabetes = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const fitness = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const xcare = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const devices = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const babycare = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});
const medicines = new mongoose.Schema({
  name: String,
  desc: String,
  rate: Number,
  image: String,
});


export const slotInfo = mongoose.model("slot",slotsSchema);
export const hospitalInformation = mongoose.model( "hospital", hospitalSchema );
export const book = mongoose.model("appointment", appointmentSchema);
export const login_register = mongoose.model("patient", patientSchema);
export const staff_details = mongoose.model("staff",staffSchema);
export const doc_details = mongoose.model("doctor",docSchema);
export const moreBooks = mongoose.model("morebook",extendedPatientSchema);

export const homecar = mongoose.model("homecare",homecare);
export const healthcar = mongoose.model("healthcare", healthcare);
export const ayurvedic = mongoose.model("ayurvedic", ayurvediccare);
export const diabete = mongoose.model("diabete", diabetes);
export const skincar = mongoose.model("skincare", skincare);
export const xcar = mongoose.model("xcare", xcare);
export const device = mongoose.model("devices", devices);
export const fitcar = mongoose.model("fitnesscare", fitness);
export const medicine = mongoose.model("medicine", medicines);
export const baby = mongoose.model("babycare", babycare);
