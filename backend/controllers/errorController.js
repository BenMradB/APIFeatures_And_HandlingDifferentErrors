module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let message = err.message;

    if (err.name === 'CastError') message = `Invalid ${err.path} : ${err.value}`;

    return res.status(err.statusCode).json({
        status: err.status,
        message
    });
}