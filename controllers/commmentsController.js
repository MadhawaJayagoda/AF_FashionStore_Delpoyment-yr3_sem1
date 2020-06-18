const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var { comments } = require('../models/comments')

router.get('/',(req,res)=>{
    comments.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var com= new comments({
        product: req.body.product,
        productId: req.body.productId,
        rating: req.body.rating,
        name: req.body.user,
        email: req.body.email,
        comment: req.body.comment,
    })

    com.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var com={
        comment: req.body.comment,
        rating: req.body.rating
    }

    comments.findByIdAndUpdate(req.params.id, { $set: com},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    comments.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router