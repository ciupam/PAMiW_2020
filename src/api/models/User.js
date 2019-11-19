const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requierd: true
    }
})

module.exports = mongoose.model('users', UserSchema);