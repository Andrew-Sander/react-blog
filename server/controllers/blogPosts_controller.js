const blogPosts = require('express').Router()
const db = require('../models')
const { BlogPost } = db
const { User } = db

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

//MAKE A BLOG POST
blogPosts.post('/create', async (req, res) => {
    try {
        const { title, body, author, date } = req.body;
        const user = await User.findOne({
            where: {
                name: author
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = await BlogPost.create({
            title: title,
            body: body,
            author: author,
            date: date,
            userID: user.userID,
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
        console.error(err);
        console.log(err);
    }
})

module.exports = blogPosts;