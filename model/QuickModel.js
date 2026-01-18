const mongoose=require("mongoose")


const QuickSchema=new mongoose.Schema({
    Q_name:{
        type:String,
        required:true
    },
    Q_mobileNo:{
        type:Number,
        required:true
    },
    Q_mail:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("QuickModel",QuickSchema)