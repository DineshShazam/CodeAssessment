const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
    }
})

const testSchemas = new mongoose.Schema({
    title: {
        type: String,
    }
})


module.exports = mongoose.model('postsTest',testSchemas);