const express=require("express")
const cors=require("cors")
require("./Dbconfig/Dbconfig")



const registerRouting = require("./Routing/RegisterRouting")
const treatmentRouting = require("./Routing/TreatmentRouting")
const LocationRouting = require("./Routing/LocationRouting")
const DoctorRouting = require("./Routing/DoctorRouting")
const OfferRouting = require("./Routing/OfferRouting")
const associateHospitalRouting = require("./Routing/AssciateHospitalRouting")
const BlogRouting = require("./Routing/BlogRouting")
const BookRouting = require("./Routing/BookRouting")
const QuickRouting = require("./Routing/QuichRouting")
const ContactRouting = require("./Routing/ContactRouting")

const app=express()
const port=4000
app.use(cors())
app.use(express.json())
app.use("/imagefile", express.static(__dirname+ "/imagefile"));
app.use('/',ContactRouting)
app.use('/',QuickRouting)
app.use('/',BookRouting)
app.use('/',BlogRouting)
app.use("/",associateHospitalRouting)
app.use('/',registerRouting)
app.use('/',treatmentRouting)
app.use('/',LocationRouting)
app.use('/',DoctorRouting)
app.use('/',OfferRouting)


app.listen(port,()=>{console.log(`port started on port number ${port}`)})
