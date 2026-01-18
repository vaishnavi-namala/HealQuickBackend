const mongoose=require("mongoose")
const OfferSchema=new mongoose.Schema({
    offerDescription:{
        type:String,
        requuired:true
    },
    OfferTitle:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Offer",OfferSchema)