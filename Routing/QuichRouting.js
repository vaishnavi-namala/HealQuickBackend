const express=require("express")
const transport = require("../Transport")

const QuickRouting=express.Router()
QuickRouting.post("/quick",async(req,res)=>{  
    const mailoptions={
        from:"208r1a67b3@gmail.com",
        to:"vaishnavinamala7@gmail.com",
        subject:"Quick Appointment",
        text:`patient_Name:${req.body.patient_Name};patient_mobileno:${req.body.patient_mobileNo};patient_mailId:${req.body.patient_mailId}`
    }
    transport.sendMail(mailoptions,(error,info)=>{
        if (error) throw error
        res.send("mail sent")
    })
   
    
   
})


module.exports=QuickRouting;