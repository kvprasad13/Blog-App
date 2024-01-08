const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
        ref: "User"
    },
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },

    title: {
        type: String,
        required: [true, "Please enter a title"]

    }
    , content: {
        type: String,
        required: [true, "Please enter a content"]

    },
    claps: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please enter claps array"],
        default: [],
    }


}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);