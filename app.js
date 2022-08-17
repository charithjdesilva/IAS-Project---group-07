const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const bodyParser = require("body-parser");



const app = express();
app.set("view engine", "ejs");


const dbURI = "mongodb+srv://ravindu0504:test123@users.ldjhmti.mongodb.net/users?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedtopology:true})
  .then((result)=>{
    console.log("db connected");
    app.listen(3000);
  })
  .catch((err)=>{
    console.log(err);
  })


// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


// routes
app.get("/home", requireAuth, (req, res) =>{
  res.render("index");
})

app.get("/", requireAuth, (req, res) =>{
  res.render("login");
})

app.get("/success", (req, res)=>{
    res.render("success")
})

app.use(authRoutes);



// =============== 2 Factor Authentication===================================//
app.use(express.static(__dirname));


app.get("/verify/otpEmail.js",function(req,res){
    res.sendFile("./otpEmail.js", { root: __dirname });
});

app.post("/btOtpAct", function(req,res,next){
        console.log("otp Button clicked");
        sendOtpMail(global.userEmail);
    // res.send("Your BMI values is: " + bmiVal.toFixed(2));
});

app.post("/btOtpConfirm",function(req,res,next){
        console.log("otp verification confirm Button clicked");
        var userInpOtp = "";
        userInpOtp = parseInt(req.body.otpInputUsr);

        console.log(userInpOtp);

        if(otpVal === userInpOtp){
            res.render("success")
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
    console.log(camInpQr);
    
    if (camInpQr == global.hashed_userEmail){
        res.render("success")
    }else{
        
    }
});



const nodemailer = require("nodemailer");

//generate a OTP value
let otpVal;



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
    otpVal = Math.floor(Math.random()*(999999 - 100000)) + 100000;
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
