const express = require('express');
const user_router = new express.Router();
const users = require('../controllers/user-controller.js');
const users_controller = new users();

user_router.route('/')
  .get(users_controller.getAll);

user_router.route('/get-by-id/:id')
.get(users_controller.getById);

user_router.route('/destroy/:id')
.post(users_controller.destroy);

user_router.route('/create')
.post(users_controller.create);

user_router.route('/update/:id')
.post(users_controller.update);

module.exports = user_router;