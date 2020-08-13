const response = require('../../network/response');

const errorHandler = (error, req, res, next) => {
    response.error(req, res, error.message, error.status||402, error);
}

module.exports = {
    errorHandler
};