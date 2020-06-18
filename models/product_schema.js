const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName : {
        type: String,
        required : true
    },
    productBrand : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        default : ''
    },
    product_category :{
        type: String,
        required : true
    },
    product_unitprice : {
        type: Number,
        required: true
    },
    product_discount : {
        type : Number
    },
    supplier_name : {
        type : String,
        required : true
    },
    product_expirationDate : {
        type: String
    },
    product_expirationStatus : {
        type : String
    },
    product_averageRating : {
        type : Number,
        required : true,
        default : 0
    },
    createdDate : {
        type : Date,
        default : Date.now
    },
    imgSrc: {
        type : String,
        default : ""
    }
});

module.exports = mongoose.model('products', productSchema);