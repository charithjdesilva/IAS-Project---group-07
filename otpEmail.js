//jshint esversion:6

//generate a OTP value
let otpVal = Math.floor(Math.random()*(999999 - 100000)) + 100000;


//
// Sending an email to a user using Nodemailer
const nodemailer = require("nodemailer");

//sender email (my email) authentication details
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port:  587,
    auth: {
        user: "IASProject-group07@outlook.com",
        pass: "group07@IASProject"
    }
});



// send mail function
function sendOtpMail(userEmail) {
    //mail content
    const options = {
        from: "IASProject-group07@outlook.com",
        to: userEmail,
        subject: "OTP for access at: ",
        text: "Your OTP is: " + otpVal
    };
    console.log(options);

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    });
}
