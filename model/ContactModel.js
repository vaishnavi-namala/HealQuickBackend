const mongoose=require("mongoose")
const ContactSchema= new mongoose.Schema({
    contact_name:{
        type:String,
        require:true
    },
    contact_mobileNo:{
        type:Number,
        required:true
    },
    contact_Mailid:{
        type:String,
        required:false
    },
    contact_Address:{
        type:String,
        required:false
    }

})

module.exports=mongoose.model("Contactmodel",ContactSchema)