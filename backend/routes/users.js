const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  patchUser,
  patchUserAvatar,
  getUserMe,
} = require('../controllers/users');
const validateURL = require('../middleware/validation-request');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getUserMe);

routerUsers.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getUser);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).required(),
  }),
}), patchUserAvatar);

module.exports = routerUsers;
