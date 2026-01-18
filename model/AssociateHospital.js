const mongoose=require("mongoose")

const associateHospitalSchema=new mongoose.Schema({
    image:{
        type:[String],
        required:true
    }
}) 

module.exports= mongoose.model("associateHospital",associateHospitalSchema)