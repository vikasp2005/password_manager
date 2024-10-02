import mongoose from 'mongoose';

const  userschema = new mongoose.Schema({
username : {
    type : String,
    required : true,
    unique : true
},
email : {

    type : String,
    required : true,
    unique : true
},
phoneno : {
    type : Number,
    required : true,
    unique : true
},
password : {
    type : String,
    required : true
},
lastlogin : {
    type : Date,
    default : Date.now
},
lastProfileEdit : {
    type : Date,
    default : Date.now
},
profileCreatedOn : {
    type : Date,
    default : Date.now
},
lastPasswordChange : {
    type : Date
},
isVerified : {
    type : Boolean,
    default : false
},
resetPasswordToken : String,
resetPasswordTokenExpireAt : Date,
verificationToken : String,
verificationTokenExpireAt : Date

},
{timestamp:true}
);


export const User = mongoose.model("User",userschema);