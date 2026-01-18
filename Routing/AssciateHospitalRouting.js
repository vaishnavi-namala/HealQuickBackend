const express=require("express")
const fs=require("fs")
const path=require("path")
const uploads = require("../multermiddle")
const AssociateHospital = require("../model/AssociateHospital")
const associateHospitalRouting=express.Router()

associateHospitalRouting.post("/associateHospital",uploads.array("image",5),async(req,res)=>{
    try{const imageURL=req.files.map(file=>{return (file.path)})
    const Images=new AssociateHospital({image:imageURL})
    const result=await Images.save()
    if(result._id){
        res.send("images been stored ")
    }else{
        res.send("couldnt upload images")

    }}catch(err){
        res.send(err)
    }
})

associateHospitalRouting.get("/associateHospital",async(req,res)=>{
    try{
    const Images=await AssociateHospital.find()
    res.send(Images)
}catch(err){
    res.send(err)
}
})

associateHospitalRouting.delete("/associateHospital/:i_id/:index",async(req,res)=>{
    try{
        const {i_id,index}=req.params;
        const doc=await AssociateHospital.findById(i_id)
        if(!doc){
            res.send("document is not available")
        }
        else{
            const imagepath=doc.image[index]
            const fullpath= path.join(__dirname,'../',imagepath)
            try{ await fs.unlink(fullpath,(err)=>{
                if(err) throw err;
            })}catch(err){
                console.log(err)
            }
            
           if(doc.image.length===1){
            const deleteImg=await AssociateHospital.findByIdAndDelete(i_id)
            res.send(deleteImg)
            
           }
           else{
            doc.image.splice(index,1)
            await doc.save()
            res.send("deleted successfully")
            
           }
        }

    }catch(err){
        res.send(err)
    }
})

module.exports=associateHospitalRouting