//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

app.get("/verify",function(req,res){
    res.sendFile("./verifyPage.html", { root: __dirname });
});

app.get("/verify/otpEmail.js",function(req,res){
    res.sendFile("./otpEmail.js", { root: __dirname });
});

app.post("/btOtpAct",function(req,res,next){
        console.log("otp Button clicked");
        sendOtpMail("testusergroup07@gmail.com");
    // res.send("Your BMI values is: " + bmiVal.toFixed(2));
});

app.post("/btOtpConfirm",function(req,res,next){
        console.log("otp verification confirm Button clicked");
        var userInpOtp = "";
        userInpOtp = parseInt(req.body.otpInputUsr);

        console.log(userInpOtp);

        if(otpVal === userInpOtp){
            console.log("OTP is a match");

            // verification success
        }
        else
        {
            console.log("The OTP number you entered is incorrect!");

            //verfication failed
        }
});

app.post("/qrConfirm",function(req,res,next){
    console.log("camera input detected");
    var camInpQr = "";
    camInpQr = req.body.camInputBoxName;

    console.log(req.body.camInputBoxName);
});

// Gettign Qr code value 
// app.post("/Login-system",function(req,res){
//     var qrCodeValue = req.body.qrcode_text;

//     console.log(qrCodeValue);
// });


const nodemailer = require("nodemailer");

//generate a OTP value
let otpVal = Math.floor(Math.random()*(999999 - 100000)) + 100000;


//
// Sending an email to a user using Nodemailer

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
var sendOtpMail = function (userEmail){

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
