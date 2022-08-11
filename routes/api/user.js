const express = require('express');
const router = express.Router();
// const {check,validationResult } = require('express-validator');
const {check, validationResult} = require('express-validator')
const Data = require("../../models/Data")
// post api for user registration
router.post("/",
[
    // here we are checking name and email and password
    check("userName","Name is required").not().isEmpty(),
    check("userId","user id should be unique").not().isEmpty(),
    check("dob","date of birth is required").not().isEmpty(),
    check("userAddress","user address is required").not().isEmpty(),
    check("photo","photo is required").not().isEmpty()
],
async (req,res)=>{
    // console.log(req.body)
    // const {userName,userId,dob,userAddress,photo}= req.body;g
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    };
    try{
        const user = new Data(req.body)
        console.log(user)
        const userRegistered = await user.save()
        res.status(201).send(userRegistered)
    }catch(err){
        res.send(err.message)
    }
});
// get all
router.get("/all",async(req,res)=>{
    try{
    const users = await Data.find()
    res.json(users)
    }
    catch(err){
        console.errors(err.message)
        res.status(500).send("Server Error")
    }
})
// get by id
router.get("/:id",async(req,res)=>{
    let id = req.params.id
    try {
        const user = await Data.findById(id);

        if(!user)
        return res.status(400).json({msg:"there is no user with this id"})

        res.status(200).json(user)
    } catch (err) {
        console.errors(err.message)
        res.json({error:err})
    }
})
// update by id
router.patch('/update/:id',async(req,res)=>{
 try {
    const id = req.params.id
    let user = await Data.findByIdAndUpdate(id.req.body)
    res.send(user)
 } catch (err) {
    console.errors(err.message)
    res.json({error:err})
 }
})
// delete by id
router.delete("/:id", async(req,res)=>{
    try {
        let user = Data.findByIdAndDelete(req.params.id)
        if(!req.params.id){
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        console.error(err.message)
        res.json({error:err})
    }
})
module.exports=router;