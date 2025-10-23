const {Router} = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin",(req,res)=>{
    res.render("signin");
})
router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.post('/signin',async (req,res)=>{
  
})
router.post('/signup',async (req,res)=>{
  const {name,email,password} = req.body;
  await User.create({name,email,password});
  return res.redirect('/');
})

module.exports = router;
