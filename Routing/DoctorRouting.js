const express=require("express")
const Doctormodel = require("../model/Doctormodel")

const DoctorRouting= express.Router()

DoctorRouting.post("/doctor", async (req,res)=>{
    try{
        const drDetails=new Doctormodel(req.body)
        const result=await drDetails.save()
        if(result._id){
            res.send("Posted the details of doctor")
        }else{
            res.send("couldnt post the details")
        }
    }catch(err){
        res.send(err)
    }
})
DoctorRouting.get("/doctor",async (req,res)=>{
    try{
        const doctor= await Doctormodel.find()
        res.send(doctor)       
    }catch(err){
        res.send(err)
    }
})

DoctorRouting.delete("/doctor/:did", async(req,res)=>{
    try{
        const did=req.params.did;
        const del=await Doctormodel.deleteOne({_id:did})
        if(del.deletedCount>0){
            res.send("deleted the data")
        }else{
            res.send("couldnt delete the data")
        }
    }catch(err){
        res.send(err)
    }
})

DoctorRouting.put("/doctor/:did",async(req,res)=>{
    try{
        const did=req.params.did
        const change=await Doctormodel.updateOne({_id:did},{$set:req.body})
        if(change.modifiedCount>0){
            res.send("changes done as per given data")
        }else{
            res.send("couldnt modify the data")
        }
    }catch(err){
        res.send(err)
    }
})
DoctorRouting.get("/doctor/:did",async (req,res)=>{
    try{
        const did=req.params.did
        const doctor=await Doctormodel.findOne({_id:did})
        res.send(doctor)
    }catch(err){
        res.send(err)
    }
})
module.exports=DoctorRouting