const routerUsers = require('express').Router();

const { getUserById } = require('../controllers/users');

routerUsers.get('/users/me', getUserById);

module.exports = routerUsers;
