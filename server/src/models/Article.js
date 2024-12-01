const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String
    },
    published: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', articleSchema);
