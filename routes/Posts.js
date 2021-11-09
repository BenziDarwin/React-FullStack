const express  = require('express')
const router  = express.Router()
const {Posts} = require("../models")

router.get("/",async (req,res) => {
    const allPosts = await Posts.findAll()
    res.json(allPosts);
});

router.get("/byId/:id",async (req,res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

router.post("/",async (req,res) =>  {
    const post = req.body
    await Posts.create(post)
    res.json("Data sent successfully")

});


module.exports = router;