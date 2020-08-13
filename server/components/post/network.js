const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const passport = require('passport');

const usersValidationHandler = require('../../utils/middleware/userValidationHandler');
// JWT strategy
require('../../utils/auth/jwt');

router.post('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('create:post'),
    async (req, res) => {
        const user = req.user._id;
        const { slug, description, shortDescription, category, title } = req.body;
        controller.addPost(user, title, slug, description, shortDescription, category)
            .then((info) => {
                response.success(req, res, info, 201)
            })
            .catch((e) => {
                response.error(req, res, 'Información Invalida', 300, e);
            })
    })

router.options('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:post'),
    async (req, res) => {
        const { user } = req.query;
        controller.getPost(user)
            .then((info) => {
                response.success(req, res, info, 201)
            })
            .catch((e) => {
                response.error(req, res, 'Información Invalida', 300, e);
            })
    })


router.get('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:post'),
    async (req, res) => {
        const { user } = req.query;
        controller.getPost(user)
            .then((info) => {
                response.success(req, res, info, 201)
            })
            .catch((e) => {
                response.error(req, res, 'Información Invalida', 300, e);
            })
    })


module.exports = router;