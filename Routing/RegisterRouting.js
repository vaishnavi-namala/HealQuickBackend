const express=require('express')
const registermodel = require('../model/registermodel')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const loginMiddlewear = require('../MiddleWear/LoginMiddlewear')
const transport = require('../Transport')
const bcrypt=require("bcrypt")

const registerRouting=express.Router()

registerRouting.post('/reset',async (req,res)=>{
        try{
          const {email,mobile}=req.body
          const exist=await registermodel.findOne({email:email,mobile:mobile})
          if(exist){
                res.send("exist")
          }
          else{
                res.send("does not exist")
          }

        }catch(err){
                res.send(err)
        }
})
registerRouting.post('/forgot',async (req,res)=>{
        try{
                const {email,mobile}=req.body;
                const exist=await registermodel.findOne({email:email,mobile:mobile})
          if(exist){
                
                const mailoptions={
                        from:"vaishnavinamala7@gmail.com",
                        to:email,
                        subject:"recollecting the forgotten password",
                        text:`please secure the password ${exist.password}`
                }
                transport.sendMail(mailoptions,(error,info)=>{
                        if(error) throw error;
                        res.send("password sent to mail")
                })
                
          }
          else{
                res.send("does not exist")
          }

        }catch(err){
                res.send(err)
        }
})

registerRouting.post('/register',async (req,res)=>{
   try{
        const {fname,lname,email,mobile,description}=req.body;
        const password=bcrypt.hashSync(req.body.password,10)
        const mailexist=await registermodel.findOne({email:email})
        const  mobexist=await registermodel.findOne({mobile:mobile})
        const passwordexist=await registermodel.findOne({password:password})
        if(mailexist){
                res.send('Already account exists through this mailId')
        }else if(mobexist){
                res.send('Already registered through this mobile number')
        }else if(passwordexist){
                res.send('please change the password')
        }else{
                const register=new registermodel({first_Name:fname,last_Name:lname,mobile:mobile,email:email,password:password,description})
                const result=await register.save()
                if(result._id){res.send("posted the data")}
                else{res.send("check the data")}
        }
        }
    catch(err){
        res.send(err.msg)
        }

})
registerRouting.put('/register/:email',async (req,res)=>{
        try{
                const email=req.params.email;
                const result=await registermodel.updateOne({email:email},{$set:req.body})
                if(result.modifiedCount==0 && result.matchedCount==0){
                        res.send(`${email} is not available`)
                }else if(result.matchedCount>=1 && result.modifiedCount==0){
                        res.send(`${req.body} is previous data`)
                }else if(result.matchedCount>=1 && result.modifiedCount>=1){
                        res.send('modifications have been done')
                }else{
                        res.send(result)
                }
        }catch(err){
                res.send(err)
        }
})
registerRouting.post('/login', async (req,res)=>{
        try{
                const {email,password}=req.body;
                const exist=await registermodel.findOne({email:email})
                if(exist){
                        if(bcrypt.compareSync(password,exist.password)){
                                const payload={
                                        user:{
                                                id:exist._id
                                }}
                                jwt.sign(payload,'JSONSTRINGWEB',{expiresIn:"0.5h"},(err,token)=>{
                                        if(err) throw err;
                                        else{
                                                res.send({token:token})
                                        }
                                
                                })                                

                        }else{
                        res.send(`wrong password`)
                }
                }else{
                        res.send("Entered the wrong mail id")
                }
        }
        catch(err){
                res.send(err)
        }
})
registerRouting.get('/admin',loginMiddlewear,(req,res)=>{
        try{
               
                res.send("admin")
        }catch(err){
                res.send(err)
        }

})


module.exports=registerRouting;