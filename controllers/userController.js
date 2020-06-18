const express = require('express');
var router = express.Router()
const nodemailer = require("nodemailer");
var ObjectID= require('mongoose').Types.ObjectId
var nodeBase64 = require('nodejs-base64-converter');
var { UserRecord } = require('../models/user')
let multer  = require('multer');

// const DIR = './public/';

// add user profile picture part
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
      //  console.log("storage filename :"+fileName);
    }
});

const upld = multer({storage});

const fileFilter = (req, file, cb) => {
    if(file.mimeType === 'image/jpeg' || file.mimeType === '/image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const uplaod = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// end user profile picture part


// get all users from database
router.get('/',(req,res)=>{
    UserRecord.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

// get specific user from database
router.get('/:id', (req,res) => {

    UserRecord.findById(req.params.id,(err, docs) =>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
})

// send email to relevant users
router.post('/send_email',(req,res)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fashionstore.proj@gmail.com',
          pass: 'fashionstore123'
        }
      });

    var mailOption ={
        from: 'fashionstore.proj@gmail.com',
        to: req.body.email,
        subject: "privilege change",
        text: "privilege change to store manager"
      }
    
      transporter.sendMail(mailOption,function(err,inf){
        if(err){
            res.send(err);
            console.log("Error");
        }else{
            res.send(inf.response);
            console.log("success");
        }
      });
    
})

// add new user to database
router.post('/',(req,res)=>{

    var record = new UserRecord({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : nodeBase64.encode(req.body.password),
        type : 'user',
        image : null
    })

    record.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

// update user privilege type from database
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }
    var records={
        type : req.body.type
    }

    UserRecord.findByIdAndUpdate(req.params.id, { $set: records },{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

// upload profile picture
router.route('/uploadImage/:id').put(upld.single('image'), (req, res, next) => {
    console.log(req.body);

    var records = {
        image : req.file,
        imageName: req.body.imageName
    }

    console.log(records);

    UserRecord.findByIdAndUpdate(req.params.id, records)
    .then(() => {
        res.json('Profile Picture Updated')
    })
    .catch(err => res.json('Error : '+err))
        
})

// update specific user from database
router.put('/edit/:id', uplaod.single('image'), (req,res,next) => {
    console.log("id :"+req.params.id);

    const url = req.protocol + '://' + req.get('host');
    console.log("url :"+url);

    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id :'+ req.params.id)
    }
    var records = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password
    }

    UserRecord.findByIdAndUpdate(req.params.id, {$set : records } ,{new : true}, (err, docs) =>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err, undefined, 2))
        }
    })

})

// delete specific user from database
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record this id : '+req.params.id)
    }

    UserRecord.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router
