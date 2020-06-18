const mongoose = require('mongoose')

var UserRecord = mongoose.model('users',{
    name : {type:String},
    email : {type:String},
    phone : {type:String},
    password : {type:String},
    type : {type:String},
    image : {type:Object},
    imageName: {type:String}
})

module.exports = { UserRecord }
