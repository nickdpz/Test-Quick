const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const response = require('../../network/response');

// Basic strategy
require('../../utils/auth/basic');


router.post('/sign-in', async (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
        try {
            if (error || !user) {
                next(error);
                return false;
            } else {
                req.login(user, { session: false }, async function (error) {
                    if (error) {
                        next(error);
                        return false;
                    } else {
                        const { _id: id, name, email, phone } = user;

                        const payload = {
                            sub: id,
                            name,
                            email
                        };

                        const token = jwt.sign(payload, process.env.AUTH_JWT_SECRET, {
                            expiresIn: '15m'
                        });

                        return res.status(200).json({ token, user: { id, name, email, phone } });
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});

module.exports = router;
