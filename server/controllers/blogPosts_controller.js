const blogPosts = require('express').Router()
const db = require('../models')
const { BlogPost } = db

//GET ALL POSTS
blogPosts.get('/', async (req, res) => {
    try{
        const foundPosts = await BlogPost.findAll()
        res.status(200).json(foundPosts)
    } catch (err) {
        res.status(500).send("server error")
        console.log(err)
    }
})

module.exports = blogPosts