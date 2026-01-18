const express=require("express")
const BlogModel = require("../model/BlogModel")
const uploads = require("../multermiddle")
const path=require("path")
const fs=require("fs")
const BlogRouting=express.Router()

BlogRouting.post('/blog',uploads.single("blog_image"),async(req,res)=>{
    try{
    const {blog_title,blog_description}=req.body
    const blog_image=req.file.path
    const blog=new BlogModel({blog_image,blog_title,blog_description})
    const result=await blog.save()
    if(result._id){
        res.send("blog posted")
    }else {
        res.send("couldnt post the blog")
    }}catch(err){
        res.send(err)
    }
})

BlogRouting.get("/blog", async (req,res)=>{
try{
   const blogs=await BlogModel.find()
   res.send(blogs)
}catch(err){
    res.send(err)
}
})

BlogRouting.delete("/blog/:b_id",async(req,res)=>{
    try{
        const {b_id}=req.params;
        const doc=await BlogModel.findById(b_id)
        if(!doc){
            res.send("Blog is not available")
        }
        const imagepath=doc.blog_image
        const fullpath= path.join(__dirname,'../',imagepath)
        try{ await fs.unlink(fullpath,(err)=>{
           if(err) throw err;
        })}catch(err){
            console.log(err)
        }
          const deleteblog=await BlogModel.deleteOne({_id:b_id})
        if(deleteblog.deletedCount>0){
            res.send("blog deleted")
        }
        else{
            res.send("couldnt delete blog")
        }
                
    }catch(err){
        res.send(err)
    }
})
BlogRouting.get("/blog/:b_id",async(req,res)=>{
    try{
        const b_id=req.params.b_id
        const blog=await BlogModel.findOne({_id:b_id})
        res.send(blog)

    }catch(err){
        res.send(err)
    }
})
BlogRouting.put("/blog/:b_id",uploads.single("blog_image"),async(req,res)=>{
    try{
        const b_id=req.params.b_id
        const {blog_title,blog_description}=req.body
        const blog = await BlogModel.findById(b_id);      
        let newImagePath = blog.blog_image; // default
        if (req.file) {
            const oldPath = path.join(__dirname, "..", blog.blog_image);
            try{ await fs.unlink(oldPath,(err)=>{
                        if(err) throw err;
                })}catch(err){
                    console.log(err)}       
                    newImagePath =  req.file.path;
                }
                const result = await BlogModel.updateOne({ _id: b_id },{$set: {blog_image: newImagePath,blog_title,blog_description}});
        
                // 4️⃣ Check modification
                if (result.modifiedCount > 0) {
                    res.send("blog updated successfully");
                } else {
                    res.send("No changes found or already same");
                }
    }catch(err){
        res.send(err)
    }
})
    
module.exports=BlogRouting;