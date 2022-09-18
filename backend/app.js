const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Handling Different Requests
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(404, `Can't Find ${req.originalUrl}`));
});

app.use(globalErrorHandler);

module.exports = app;