import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    login: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('users', UserSchema);