const express=require("express")
const OfferModel = require("../model/OfferModel")
const OfferRouting=express.Router()

OfferRouting.post('/offer',async (req,res)=>{
    try{
   const Offer=new OfferModel(req.body)
   const result=await Offer.save()
   if(result._id){
    res.send("posted the offer")
   }else{
    req.send("Couldnt post the offer")
   }
}catch(err){
    res.send(err)
}
})

OfferRouting.get('/offer',async(req,res)=>{
    const offer=await OfferModel.find()
    res.send(offer)
})

OfferRouting.delete("/offer/:oid",async(req,res)=>{
    try{
        const oid=req.params.oid
        const deleteoffer=await OfferModel.deleteOne({_id:oid})
        if(deleteoffer.deletedCount>0){
            res.send("deleted the data")
        }else{
            res.send("couldnt delete the data")
        }
    }catch(err){
        res.send(err)
    }
})

OfferRouting.get("/offer/:oid",async(req,res)=>{
    try{
        const oid=req.params.oid
        const offer=await OfferModel.findOne({_id:oid})
        res.send(offer)

    }catch(err){
        res.send(err)
    }
})
OfferRouting.put("/offer/:oid",async(req,res)=>{
    try{
        const oid=req.params.oid
        const editOffer=await OfferModel.updateOne({_id:oid},{$set:req.body})
        if(editOffer.modifiedCount>0){
           res.send("modified the data")
        }else{
            res.send("Already Has The Existing Data")
        }
    }catch(err){
        res.send(err)
    }
})
module.exports=OfferRouting