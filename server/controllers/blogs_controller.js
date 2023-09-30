const blogs = require('express').Router()
const db = require('../models')
const { Blog } = db
const { Category } = db
const { User } = db


//GET ALL BLOGS
blogs.get('/', async (req, res) => {
    try{
        const foundBlogs = await Blog.findAll()
        res.status(200).json(foundBlogs)
    } catch (err) {
        res.status(500).send("server error")
        console.log(err)
    }
})

//GET PERSONAL POSTS
blogs.get('/me/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const foundBlogs = await Blog.findAll({
            where: {
                author: username
            }
        });
        res.status(200).json(foundBlogs);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})

//GET BLOGS BY ID
blogs.get('/id/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const foundBlogs = await Blog.findAll({
            where: {
                id: id
            }
        });
        res.status(200).json(foundBlogs);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})


//GET PUBLIC POSTS
blogs.get('/postsby/:username', async (req, res) => {
    try{
        const username = req.params.username;
        const foundBlogs = await Blog.findAll({
            where: {
                author: username
            }
        });
        res.status(200).json(foundBlogs);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
})

//MAKE A BLOG
blogs.post('/create', async (req, res) => {
    try {
        const { title, description, author, category } = req.body;
        const user = await User.findOne({
            where: {
                name: author
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = await Blog.create({
            title: title,
            description: description,
            author: author,
            category: category,
            userID: user.userID,
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
        console.error(err);
        console.log(err);
    }
})

//GET CATEGORIES
blogs.get('/categories', async (req, res) => {
    try{
        const foundCategories = await Category.findAll()
        res.status(200).json(foundCategories)
    } catch (err) {
        res.status(500).send("server error")
        console.log(err)
    }
})

module.exports = blogs;