const withErrorStack = (error, message) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(error);
        return {
            'error': error,
            'message': message
        }
    }
    return { 'error': message }
}

const success = (req, res, messages, status) => {
    res.status(status || 200).send({
        'error': '',
        'message': messages
    })
}

const error = (req, res, message, status, error) => {
    res.status(status || 500).send(withErrorStack(error, message));
}

module.exports = { success, error };