const express = require("express")
const router = express.Router()
const {Comments} = require("../models")
const {verifyToken} = require("../middleWare/Authenticate")

router.get("/:PostId", async (req,res) => {
    const id = req.params.PostId
    const comments =await Comments.findAll({where:{PostId:id}})
    res.json(comments)
})

router.post("/", verifyToken , async (req,res) => {
    let {commentBody,username,PostId} = req.body
    username = req.user.username
    await Comments.create({commentBody,username,PostId})
    res.json("Data sent successfully")
})



module.exports = router