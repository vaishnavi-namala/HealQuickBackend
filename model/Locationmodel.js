const mongoose=require("mongoose")


const LocationSchema=new mongoose.Schema({
    treatName:{
        type:String,
        required:true
    },
    locations:{
        type:[String],
        required:false
    }
})

module.exports=mongoose.model("location",LocationSchema)