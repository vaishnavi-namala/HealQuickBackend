const express= require("express")
const BookModel = require("../model/BookModel")
const BookRouting=express.Router()

BookRouting.post('/book',async(req,res)=>{
    try{
    const booking=new BookModel(req.body)
    const result=await booking.save()
    if(result._id){
        res.send("Appointment has been book")
    }else{
        res.send(" couldnt book the appointment at this time")
    }}catch(err){
        res.send(err)
    }    
})

module.exports=BookRouting