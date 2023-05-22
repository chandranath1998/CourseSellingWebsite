const mongoose = require('mongoose');


const videoschema = new mongoose.Schema({

course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    files: [{
        type: String,
        fileUrl: String
    }],
    videoAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("videos", videoschema)