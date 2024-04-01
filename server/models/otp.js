const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({

    email:{
        type:String,
        required: true,
    },

    otp:{
        type:String,
        required: true,
    },

    // for time span
    createdAt:{
        type:Date,
        default: Date.now,
        expires:60*5, // for only 5 mins
    }



});
// ***otp ko mail sender vali cheez hamesha schema k neeche or model ke upar likhte h
// a func to send email send verification mail-> sendotpmail name given
const sendOtpMail = async(email,otp)=>{
    try{

        const mailResponse = await mailSender(email,"OTP FROM STUDYNOTION" , otp);
        //handle errors
//        console.log("Email sent successfully" , mailResponse);
        console.log("Email sent successfully", mailResponse);

        
    }catch(error){
        console.log("Error in sending otp via mail",error);
        throw error;
    }
}

// use of pre middleware
otpSchema.pre("save", async function(next){
    //Pre middleware functions are executed one after another, when each middleware calls next


    await sendOtpMail(this.email , this.otp);
    next();
})

module.exports = mongoose.model("Otp" , otpSchema);

//Pre-middleware functions, also known as pre-hooks, are executed before a specific operation is performed on a Mongoose model (e.g., saving a document, updating a document, removing a document).
// They can be used for tasks such as data validation, data manipulation, setting default values, and more.

//Post-middleware functions, also known as post-hooks, are executed after a specific operation is performed on a Mongoose model (e.g., saving a document, updating a document, removing a document).
//They can be used for tasks such as logging, triggering additional actions, sending notifications, and more.