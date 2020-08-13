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
    usersValidationHandler('crate:category'),
    (req, res) => {
        const { name, shortDescription } = req.body;
        controller.addCategory(name, shortDescription)
            .then((data) => {
                response.success(req, res, data, 200)
            })
            .catch((e) => {
                response.error(req, res, 'Error Interno', 500)
            })
    })

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:category'),
    (req, res) => {
        controller.getCategory(req.params.id)
            .then((data) => {
                response.success(req, res, data, 200)
            })
            .catch((e) => {
                response.error(req, res, 'Error Interno', 500)
            })
    })

router.get('/', (req, res) => {
    controller.getCategories(req.query)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((e) => {
            response.error(req, res, 'Error Interno', 500)
        })

})


module.exports = router;