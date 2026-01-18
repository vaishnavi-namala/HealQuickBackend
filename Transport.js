const nodemailer=require("nodemailer")
const transport=nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                                user:"vaishnavinamala7@gmail.com",
                                pass:"iftg mbic elos ajyl"
                        },
                        tls:{
                                rejectUnauthorized:false
                        }
                })
                
module.exports=transport