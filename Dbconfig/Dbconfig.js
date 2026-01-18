const mongoose=require('mongoose')
const conurl="mongodb+srv://vaishnavinamala7_db_user:<db_password>@healquick.ztq4r01.mongodb.net/?appName=HEALQUICK"
mongoose.connect(conurl)
.then(con=>console.log("connect"))
.catch(err=>console.log(err))

