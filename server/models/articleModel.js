const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]

    }
    , content: {
        type: String,
        required: [true, "Please enter a content"]

    }
} ,{timestamps:true});

module.exports = mongoose.model("Article" , articleSchema);