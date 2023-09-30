const blogPosts = require('express').Router()
const db = require('../models')
const { BlogPost } = db
const { User } = db
const { Blog } = db

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
        const { title, body, author, date, selectedBlog } = req.body;
        const user = await User.findOne({
            where: {
                name: author
            }
        });
        const blog = await Blog.findOne({
            where: {
                title: selectedBlog
            }
        })

        const post = await BlogPost.create({
            title: title,
            body: body,
            author: author,
            date: date,
            userID: user.userID,
            blogID: blog.id
            
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
        console.error(err);
    }
})

module.exports = blogPosts;