import mongoose from 'mongoose';

const FileSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    }
});

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    files: [FileSchema],
    _public: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('posts', PostSchema);