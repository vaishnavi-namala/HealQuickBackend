const express=require("express");
const Locationmodel = require("../model/Locationmodel");
const treatmodel = require("../model/treatmodel");
const Doctormodel = require("../model/Doctormodel");
const LocationRouting=express.Router()

        

LocationRouting.post("/location",async(req,res)=>{
    try{
        const {treatName,location}=req.body;
        const treatments=await Locationmodel.findOne({treatName:treatName})
        if(treatments._id){
            if (treatments.locations.includes(location)){
                res.send("already location exists on this treatment")
            }
            else{
            treatments.locations.push(location)
            const post=await treatments.save()
            if(post.locations.includes(location)){
                res.send("posted the location")
            }}
        }
    }
    catch(err){
        res.send(err)
    }
})
LocationRouting.get("/location",async(req,res)=>{
    try{
        const  location=await Locationmodel.find()
        
        res.send(location)
    }catch(err){
        res.send(err)
    }
})

LocationRouting.delete("/location/:lid/:location",async(req,res)=>{
    try{
        const {lid,location}=req.params
        const doc=await Locationmodel.findOne({_id:lid})
        doc.locations.pull(location)
        await doc.save()
        const doctors=await Doctormodel.deleteMany({treatName:doc.treatName,location:location})
        if(!doc.locations.includes(location)){
            
            res.send(`Removed Lcation and ${doctors.deletedCount} also Removed In That Location`)
        }else{
            res.send("couldnt delete the data")
        }
    }catch(err){
        res.send(err)
    }
})
LocationRouting.get("/location/:lid",async(req,res)=>{
    try{
        const lid=req.params.lid
        const location=await Locationmodel.findOne({_id:lid})
        res.send(location)

    }catch(err){
        res.send(err)
    }
})
LocationRouting.put("/location/:lid",async(req,res)=>{
    try{
        const lid=req.params.lid
        const editlocation=await Locationmodel.updateOne({_id:lid},{$set:req.body})
        if(editlocation.modifiedCount>0){
           res.send("modified the data")
        }else{
            res.send("Already Has The Existing Data")
        }
    }catch(err){
        res.send(err)
    }
})


module.exports= LocationRouting;