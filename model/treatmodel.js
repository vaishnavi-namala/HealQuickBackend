const mongoose=require('mongoose')

const treatSchema=new mongoose.Schema({
    treatName:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    }
})

module.exports=mongoose.model('treat',treatSchema)