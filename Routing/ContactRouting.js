const express= require("express")
const ContactModel = require("../model/ContactModel")
const ContactRouting=express.Router()

ContactRouting.post('/Contact',async(req,res)=>{
    try{
    const Contact=new ContactModel(req.body)
    const result=await Contact.save()
    if(result._id){
        res.send("sent the message")
    }else{
        res.send(" couldnt send the message")
    }}catch(err){
        res.send(err)
    }    
})

module.exports=ContactRouting