const mongoose=require("mongoose")
const BookSchema=new mongoose.Schema({
    treatName:{
        type:String,
        required:true
    },location:{
        type:String,
        required:true
    },doctorName:{
        type:String,
        required:true
    },patientName:{
        type:String,
        required:true
    },patient_mobileNo:{
        type:Number,
        required:true
    },patient_mail:{
        type:String,
        required:true
    },patient_Message:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Bookmodel",BookSchema)