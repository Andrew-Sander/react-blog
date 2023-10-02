const blogPosts = require('express').Router()
const db = require('../models')
const { BlogPost } = db
const { User } = db
const { Blog } = db

//GET ALL POSTS
blogPosts.get('/', async (req, res) => {
    try{
        const foundPosts = await BlogPost.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json(foundPosts);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})
//GET POSTS BY BLOG
blogPosts.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const foundPosts = await BlogPost.findAll({
            where: {
                blogID: id
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json(foundPosts);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})

//GET POSTS BY ID
blogPosts.get('/post/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const foundPost = await BlogPost.findOne({
            where: {
                postID: id
            },
        });
        res.status(200).json(foundPost);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})

//GET PERSONAL POSTS
blogPosts.get('/me/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const foundPosts = await BlogPost.findAll({
            where: {
                author: username
            },
            order: [
                ['createdAt', 'DESC']
            ],
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
        const { title, body, author, date, id } = req.body;
        const user = await User.findOne({
            where: {
                name: author
            }
        });
        const blog = await Blog.findOne({
            where: {
                id: id
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

//DELETE A POST
blogPosts.delete('/delete', async (req, res) => {
    try {
        const { postID } = req.body;

        const post = await BlogPost.destroy({
            where: {
                postID: postID
            }
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
        console.error(err);
        console.log(err);
    }
})

module.exports = blogPosts;