const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const bodyParser = require("body-parser");



const app = express();
app.set("view engine", "ejs");


const dbURI = "mongodb+srv://ravindu0504:test123@secret.z1ncj.mongodb.net/secret?retryWrites=true&w=majority"

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
app.get("/", requireAuth, (req, res) =>{
  res.render("index");
})


app.use(authRoutes);



// =============== OTP Code =====================================//

// Sending an email to a user using Nodemailer
const nodemailer = require("nodemailer");

//sender email (my email) accesing info
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port:  587,
    auth: {
        user: "IASProject-group07_01@outlook.com",
        pass: "group07@IASProject"
    }
});

//mail
const options = {
    from: "IASProject-group07_01@outlook.com",
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
