const mongoose = require('mongoose')

var comments = mongoose.model('comments',{
    product : {type:String},
    productId: {type:String},
    name : {type:String},
    email : {type:String},
    rating : {type:Number},
    comment : {type:String},
})

module.exports = { comments }