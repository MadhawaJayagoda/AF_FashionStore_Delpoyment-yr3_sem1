const mongoose = require('mongoose')

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/fashionstoreDB',{useNewUrlParser:true,useUnifiedTopology:true},
err => {
    if(!err){
        console.log("db connection success!")
    }else{
        console.log("db connection fail!" + JSON.stringify(err, undefined , 2))
    }
})
