const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");



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

// routes
app.get("/", requireAuth, (req, res) =>{
  res.render("index");
})

app.use(authRoutes);