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

//GET PERSONAL POSTS
blogPosts.get('/me/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const foundPosts = await BlogPost.findAll({
            where: {
                author: username
            }
        });
        res.status(200).json(foundPosts);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})

module.exports = blogPosts;