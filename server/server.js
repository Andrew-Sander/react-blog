//DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require('sequelize');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//CONFIGURATION
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//CONTROLLERS
const blogPostsController = require('./controllers/blogPosts_controller');

app.use('/api/blogPosts/', blogPostsController);

//LISTEN
app.listen(8000, () => {
    console.log('server is running on port 8000')
});