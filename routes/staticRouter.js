const express = require('express');
const router = express.Router();

// router.get('/',(req,res)=>{
//     return res.render('home')
// })

router.get("/Signup",(req,res)=>{
    return res.render("Signup");
})

module.exports=router;