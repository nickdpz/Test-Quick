const validationUsers = {
    admin: [
        'create:post',
        'delete:post',
        'get:posts',
        'get:post',
        'create:category',
        'delete:category',
        'get:category',
        'delete:user',
        'get:user',
    ],
    customer: [
        'update:user',
        'delete:user',
        'create:post',
        'delete:post',
        'get:posts',
        'get:post',
    ]
}

function usersValidationHandler(allowedScope) {
    return function (req, res, next) {
        if (process.env.NODE_ENV === "development") {
            next();
        } else {
            if (!req.user || (req.user && !req.user.role)) {
                next({ message: "unauthorized", status: 401 });
            }
            const hasAccess = validationUsers[req.user.role].includes(allowedScope);
            if (hasAccess) {
                next();
            } else {
                next({ message: "unauthorized", status: 401 });
            }
        }
    };
}

module.exports = usersValidationHandler;