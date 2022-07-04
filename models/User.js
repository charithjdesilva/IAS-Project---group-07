
const mongoose = require('mongoose');
const {isEmail} = require('validator'); 

const Sha256 = require(".././sha")

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true, 
    lowercase:true, 
    validate : [isEmail, 'Please enter a valid email address'] 
  },
  password: {
    type:String,
    required:[true, 'Please enter a password'],
    minlength:[6, 'Minimum password length is 6 characters']
  }
});

// fire a function after new doc is saved to db
userSchema.post('save', function(doc, next){
  console.log('new user was created and saved'); 
  next();
});


// fire a function before a new doc is saved to db
userSchema.pre('save', async function(next){
  // const salt = await bcrypt.genSalt();
  // this.password = await bcrypt.hash(this.password, salt)
  this.password = Sha256.hash(this.password)
  next();
})


/*
 * Login function using hash algorithm 
 */
/* =============================================
================================================
================================================= */

global.userEmail;

userSchema.statics.login = async function(email, password){
  
    const user = await this.findOne({email: email});
    global.userEmail = user.email;

    if(user){
      password = Sha256.hash(password)
      if(password == user.password){
        return user;
      }
      throw Error("Incorrect Password");
    }
    throw Error('Incorrect Email');
    
}


const User = mongoose.model('user',userSchema);

module.exports = User;