const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name Is A Required Field'],
        minLength: [8, 'Your User Name is Too Short']
    },
    email: {
        type: String,
        required: [true, 'Email Is A Required Field'],
        unique: [true, 'That Email Already In Use']
    },
    password: {
        type: String,
        required: [true, 'Password Is A Required Field'],
        minLength: [8, 'Password Length Must Be Grater Than Or Equal To 8'],
        maxLength: [20, 'Password Length Must Be Less Than Or Equal To 20']
    }, 
    rank: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);