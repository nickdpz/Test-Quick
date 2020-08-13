const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const storeUser = require('../../components/user/store');

passport.use(
    new Strategy(
        {
            secretOrKey: process.env.AUTH_JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function (tokenPayload, cb) {

            try {
                const user = await storeUser.getUser({ email: tokenPayload.email });

                if (!user) {
                    return cb({ message: "unauthorized" }, false);
                }

                delete user.password;

                cb(null, user);
            } catch (error) {
                return cb(error);
            }
        }
    )
);
