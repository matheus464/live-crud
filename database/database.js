const sequelize = require('sequelize');

const connection = new sequelize('livecrud', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;