const User = require('../models/userModel');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

module.exports.getUsers = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitingFields()
        .paginate()

    const users = await features.query;

    return res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            users
        }
    });
});

module.exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError(404, 'Cannot Find A User Under That ID'));

    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

module.exports.createUser = catchAsync(async (req, res, next) => {
    const { userName, email, password, confirmPassword } = req.body;
    
    const userExist = await User.findOne({ email });

    if (userExist) return next(new AppError(404, `That Email Already In Use`));

    if (password !== confirmPassword) next(new AppError(400, `Passwords Do Not Match`));

    const user = await User.create({ userName, email, password });

    if (!user) return next(new AppError(404, `Something Went Wrong While The Creation Of Your Account`));

    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

module.exports.updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) return next(new AppError(404, 'Cannot Find A User Under That ID'));

    return res.status(200).json({
        status: 'success',
        data: {
            updatedUser
        }
    });
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id, {
        new: true
    });

    if (!deletedUser) return next(new AppError(404, 'Cannot Find A User Under That ID'));

    return res.status(200).json({
        status: 'success',
        data: {
            deletedUser
        }
    });
});