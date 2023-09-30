//DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require('sequelize');
const path = require('path');
const cors = require('cors');

//CONFIGURATION
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CONTROLLERS
const blogPostsController = require('./controllers/blogPosts_controller');
const blogsController = require('./controllers/blogs_controller');

app.use('/api/blogPosts/', blogPostsController);
app.use('/api/blogs/', blogsController);

//LISTEN
app.listen(8000, () => {
    console.log('server is running on port 8000')
});
