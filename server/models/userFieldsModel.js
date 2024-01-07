const mongoose = require('mongoose');

const userFieldsModel = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
        ref: "User"
    },
    favoriteArticles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please add the user favorite articles"],
        default: []
    },
    recentSearches: {
        type: [String],
        required: [true, "Please add the user favorite articles"],
        default: []

    }

}, { timestamps: true });

module.exports = mongoose.model("UserFields", userFieldsModel);