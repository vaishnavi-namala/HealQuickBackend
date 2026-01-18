 const mongoose= require("mongoose");

const DoctorSchema=new mongoose.Schema({
    treatName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    d_qual:{
        type:String,
        required:true
    },
    d_num:{
        type:Number,
        required:true
    },
    d_email:{
        type:String,
        required:true
    },
    d_experince:{
        type:Number,
        required:true
    },
    d_skills:{
        type:String,
        required:false
    },
    Description:{
        type:String,
        required:false
    }
})



module.exports=mongoose.model("doctor",DoctorSchema)