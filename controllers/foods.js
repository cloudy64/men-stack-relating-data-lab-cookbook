const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/',(req,res)=>{

 res.render('foods/index.ejs');//render always goes to views
})
//in server.js i use app.get here we cannot use i want to use little bit from the server 

router.get('/new',(req,res)=>{
  res.render('foods/new.ejs');
})
module.exports = router;