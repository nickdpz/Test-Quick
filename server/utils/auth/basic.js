const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const response = require('../../network/response');
const bcrypt = require('bcrypt');

const storeUser = require('../../components/user/store');

passport.use(
    new BasicStrategy(async function (email, password, cb) {
        try {
            const user = await storeUser.getUser({ email });
            if (!user) {
                return cb({ message: "unauthorized" }, false);
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return cb({ message: "unauthorized" }, false);
            }

            delete user.password;

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
);
