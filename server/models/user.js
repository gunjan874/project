const mongoose = require("mongoose"); // used for importing mongoose

const userSchema = new mongoose.Schema({ // created new mongoose schema

    // In Mongoose, the trim option is used to ensure that strings saved through the schema are properly trimmed. 
    //This means that any whitespace characters, including spaces, tabs, and newlines,
    // will be removed from both the beginning and end of the string before it is saved to the database.
   
    firstName:{
        type:String,
        required:true,
        trim:true,
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
    },

    password:{
        type:String,
    },

    accountType:{
    //The enum validator is an array that will check if the value given is an item in the array.
    // If the value is not in the array, Mongoose will throw a ValidationError when you try to save() 
        type:String,
        enum:["Student","Instructor" ,"Admin"],
        required:true,
    },

    active:{
        type: Boolean,
        default: true,
    },
    approved:{
        type: Boolean,
        default: true,
    },

    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },

    courses:[{
        // as we have used array bcz courses can be many
        type:mongoose.Schema.Types.ObjectId, // jisko bhi refer karte h uska type ye hota h
        ref:"Course",
    }],


    image:{
        type:String, // as url hoga 
        required:true,
    },

    token:{
        type:String,
        default:null,
    },
    resetPasswordExpires: {
        type:Date,
        default:null,
    },

    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
    }]

},{ timestamps: true });

module.exports = mongoose.model("User" , userSchema);
// module.exports = mongoose.model("User", userSchema); is used to export a Mongoose model definition for a "User" entity.
// module.exports: This is a special object in Node.js that determines what should be exported from a file when it is required in another file.
// Whatever is assigned to module.exports will be returned when another file requires this file.