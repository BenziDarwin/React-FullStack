const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require('bcrypt')
const {sign} = require("jsonwebtoken")
const {verifyToken} = require("../middleware/Authenticate")

router.post("/",async (req,res) => {
    const {username, password} = req.body
    const user = await Users.findOne({where : {username:username}})
    if(user) {
        res.json({login:false,message:"Username Already exists!"})
    }
    else{
        bcrypt.hash(password,10).then(hash => {
        Users.create({username:username, password:hash})
        })
        const NewUser = await Users.findAll({where:{username:username}})
        const accessToken = sign({username:username,id: NewUser.id},"kings")
        res.json({accessToken,login:false,message:"Account Created Successfully..."})
    };
})

router.post("/login",async (req,res) => {
    const {username,password} = req.body
    const user =await Users.findOne({where: {username:username}})
    if(user){
        bcrypt.compare(password,user.password).then((match) => {
           if(match){
            const accessToken = sign({username: user.username,id: user.id},"kings")
            res.json({accessToken,login:true,message:"Successfully logged in..."})
           }
           else {
            res.json({login:false,message:"Incorrect Password and User combination!"})
           };
        })
    } else {
        res.json({login:false,message:"Incorrect Password and User combination!"})
    };
})

router.get("/check",verifyToken,(req,res) => {
    res.json({login:true,message:"User verified"})
})


module.exports = router