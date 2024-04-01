const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    courseName:{
        type:String,
        trim: true,
    },

    courseDescription:{
        type:String,
        required: true,
    },

    whatWillYouLearn:{
        type:String
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // as user can be both instructor or student
        required:true,
    },

    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        // course content contains multiple sections that is why array
        ref:"Section"    
    }],

    ratingAndReviews:[{
         // rating n reviews content contains multiple sections that is why array
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    }],

    price:{
        type:Number
    },

    thumbnail:{
        type:String,
    },

    tag: {
		type: mongoose.Schema.Types.ObjectId,
        ref:"Tag",
		//required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},

    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }],

    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    


},{timestamps:true});

module.exports = mongoose.model("Course" , courseSchema);