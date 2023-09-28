require('dotenv').config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

exports.handler = async (event, context) => {
  try {
    // Use Sequelize to insert a new user into the database
    const User = sequelize.define('User', {
      // Define your model properties
      name: Sequelize.STRING,
      // ...
    });

    await sequelize.sync(); // Synchronize model with the database

    // Create a new user record based on event data
    await User.create({
      name: event.request.userAttributes.username,
      // ...
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registration successful' }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
