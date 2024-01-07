const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
        ref: "User"
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add article ID"],
        ref: "Article"

    },
    body: {
        type: String,
        required: [true, "Please enter body  of the comment"],
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
    },

    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [false, "Please enter a parent identifier"],
        default: null
    },
    level: {
        type: Number,
        required: [true, "Please enter level"],
        default: 0

    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please enter likes"],
        default: [],
    },
    dislikes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please enter dislikes"],
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
