const mongoose=require("mongoose")
const blogSchema= new mongoose.Schema({
    blog_image:{
        type:String,
        require:true
    },
    blog_title:{
        type:String,
        required:true
    },
    blog_description:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("blogmodel",blogSchema)