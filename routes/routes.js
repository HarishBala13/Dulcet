const express=require("express");
const router=express.Router();
router.get(['/','/images'],(req,res)=>{
    res.render("images");
});
router.get('/reg',(req,res)=>{
    res.render("reg");
});
router.get('/imagesstore',(req,res)=>{
    res.render("imagesstore");
});
module.exports=router;