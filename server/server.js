//DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require('sequelize');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT

//CONFIGURATION
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')))

//CONTROLLERS
const blogPostsController = require('./controllers/blogPosts_controller');
const blogsController = require('./controllers/blogs_controller');
const usersController = require('./controllers/users_controller');

app.use('/api/blogPosts/', blogPostsController);
app.use('/api/blogs/', blogsController);
app.use('/api/users/', usersController);

//LISTEN
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
// app.listen(8000, () => {
//     console.log(`server is running on port 8000`)
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
