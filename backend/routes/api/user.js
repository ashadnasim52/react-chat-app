const express = require('express');
const route = express.Router();

const userHandler = require('../../controller/api/userhandler');

route.post('/addUser', userHandler.addUserHandler);
route.get('/getUser', userHandler.getUserHandler)
route.post('/signin', userHandler.sigined)

module.exports = route