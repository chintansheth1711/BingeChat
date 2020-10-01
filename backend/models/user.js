const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const secret = 'abc123';
const userSchema = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    image: String,
    token: {
        type: String,
    }
}, {
    timestamps: true
});


userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(salt, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.generateToken = async function (cb) {
    let user = this;
    let token = jwt.sign({ _id: user._id }, secret)
    user.token = token;
    try {
        user = await user.save();
    }
    catch (err) {
        return cb(err);
    }
    return cb(null, user);

}

const User = mongoose.model('User', userSchema);
module.exports = { User }