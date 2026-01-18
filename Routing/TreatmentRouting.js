const express=require("express")
const treatmodel = require("../model/treatmodel")
const doctormodel=require("../model/Doctormodel")
const uploads = require("../multermiddle")
const path=require("path")
const fs = require("fs");
const Locationmodel = require("../model/Locationmodel")


const treatmentRouting=express.Router()
treatmentRouting.post('/treat',uploads.single("image"),async (req,res)=>{
    const {treatName,description}=req.body
    const treatExist=await treatmodel.find({treatName:treatName})
    if(treatExist.length===0){
    const treatment=new treatmodel({
        treatName,
        image:"/imagefile/"+req.file.filename,
        description
    })
    const result=await treatment.save()
    const treat=new Locationmodel({treatName:treatName})
        await treat.save()
    if(result._id){
        res.send("posted the data")
    }else{
        res.send("couldnt post data")
    }}
    else{
        res.send("Treatment Exists")
    }
})

treatmentRouting.get("/treat",async(req,res)=>{
    const data=await treatmodel.find()
    res.send(data)
})


treatmentRouting.delete("/treat/:tid/:treatment",async(req,res)=>{
    try{
        const {tid,treatment}=req.params
        const treatmentdoc=await treatmodel.findById(tid)
        const deleteTreat=await treatmodel.deleteOne({_id:tid})
        const fullpath=path.join(__dirname,"..",treatmentdoc.image)
        try{ await fs.unlink(fullpath,(err)=>{
                                if(err) throw err;
                        })}catch(err){
                            console.log(err)}       
                            
        await Locationmodel.deleteOne({treatName:treatment})
        const deletedoctor=await doctormodel.deleteMany({treatName:treatment})
        if(deleteTreat.deletedCount>0 ){
            res.send(`${deletedoctor.deletedCount} doctor got deleted`)
        }else{
            res.send("couldnt delete the data")
        }
    }catch(err){
        res.send(err)
    }
})
treatmentRouting.get("/treat/:tid",async(req,res)=>{
    try{
        const tid=req.params.tid
        const treatment=await treatmodel.findOne({_id:tid})
        res.send(treatment)

    }catch(err){
        res.send(err)
    }
})
treatmentRouting.put("/treat/:tid",uploads.single("image"),async(req,res)=>{
    try{
        const tid=req.params.tid
        const {treatName,description}=req.body
         
        const treatment = await treatmodel.findById(tid)
        let newImagePath = treatment.image;
        if (req.file) {
            const oldPath = path.join(__dirname, "..", treatment.image);
           try{ await fs.unlink(oldPath,(err)=>{
                           if(err) throw err;
                       })}catch(err){
                           console.log(err)
                       }
            

            newImagePath = "/imagefile/" + req.file.filename;
        }

        // 3️⃣ Update the document
        const result = await treatmodel.updateOne({ _id: tid },{$set: {treatName,image: newImagePath,description}});

        // 4️⃣ Check modification
        if (result.modifiedCount > 0) {
            res.send("Treatment updated successfully");
        } else {
            res.send("No changes found or already same");
        }
    }catch(err){
        res.send(err)
    }
})


module.exports=treatmentRouting;