const mongoose=require('mongoose')

const registerschema=new mongoose.Schema({
    first_Name:{
        type:String,
        required:true
    },
    last_Name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    }
})

module.exports=mongoose.model("register",registerschema)