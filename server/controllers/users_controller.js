const users = require('express').Router();
const db = require('../models');
const { User } = db;

//GET USER BY USERNAME
users.get('/username/:username', async (req, res) => {
    console.log('reeived request');
    try{
        const username = req.params.username;
        const foundUsers = await User.findOne({
            where: {
                name: username
            }
        });
        res.status(200).json(foundUsers);
        console.log(`user ${username} retrieved`);
    } catch (err) {
        res.status(500).send("server error");
        console.log(err);
    }
});

//UPDATE USER
users.post('/update', async (req, res) => {
    try {
        const { name, about } = req.body;

        const update = await User.update({
            about: about
        }, {
            where: {
                name: name
            }
        });
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: "Error updating user" });
        console.error(err);
        console.log(err);
    }
})

module.exports = users;