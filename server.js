//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

app.get("/Login-system",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// Gettign Qr code value 
app.post("/Login-system",function(req,res){
    var qrCodeValue = req.body.qrcode_text;

    console.log(qrCodeValue);
});

//
// Sending an email to a user using Nodemailer
const nodemailer = require("nodemailer");

//sender email (my email) accesing info
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port:  587,
    auth: {
        user: "IASProject-group07@outlook.com",
        pass: "group07@IASProject"
    }
});

//mail
const options = {
    from: "IASProject-group07@outlook.com",
    to: "testusergroup07@gmail.com",
    subject: "OTP for access at: ",
    text: "Your OTP is: "
};

//sending the mail
transporter.sendMail(options, function(err, info){
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("Sent: " + info.response);
});