const firebaseConfig = {
    apiKey: "AIzaSyDwe-00NZmLTmw9YyiXVxn9HyuRAqFyNrs",
    authDomain: "contactform-5bb92.firebaseapp.com",
    databaseURL: "https://contactform-5bb92-default-rtdb.firebaseio.com",
    projectId: "contactform-5bb92",
    storageBucket: "contactform-5bb92.appspot.com",
    messagingSenderId: "26426185707",
    appId: "1:26426185707:web:93ded5968c470a4e86abae"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var age = getElementVal("age");
    var address = getElementVal("address");
    var number = getElementVal("number");
    var emailid = getElementVal("emailid");
    // var doctor = getElementVal("doctor");
    var datetime = getElementVal("datetime");
    var msgContent = getElementVal("msgContent");

    saveMessages(name, age, address, number, emailid, doctor, datetime, msgContent);

    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 5000);

    //   reset the form
    document.getElementById("contactForm").reset();
}

const saveMessages = (name, age, address, number, emailid, datetime, msgContent) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        name: name,
        age: age,
        address: address,
        number: number,
        emailid: emailid,
        // doctor: doctor,
        datetime: datetime,
        msgContent: msgContent,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
