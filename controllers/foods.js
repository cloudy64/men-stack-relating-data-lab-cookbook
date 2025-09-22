const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/',async(req,res)=>{

  try {
       const currentUser = await User.findById(req.session.user._id);
       res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
        HasEmptyPantry: currentUser.pantry.length === 0, 
       });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
//in server.js i use app.get here we cannot use i want to use little bit from the server 

router.get('/new',(req,res)=>{
  res.render('foods/new.ejs');
})

router.post('/',async(req,res)=>{
  try{
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body); //dealing with array so .push eveything 
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`); //redirect goes to server.js it wont put in mind the /user/id the one dont change
  }catch(error){
    console.log(error);
    res.redirect('/');
  };
})

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const food = currentUser.pantry.id(req.params.foodId);

    res.render('foods/show.ejs', {
      food: food,
    });
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    
    currentUser.pantry.id(req.params.foodId).deleteOne();

    await currentUser.save();
 
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;