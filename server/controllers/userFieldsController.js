
const UserFields = require('../models/userFieldsModel');
const asyncHandler = require('express-async-handler');
const addUserFields = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.status(400).send(" user from the request is not found");


    }

    const field = await UserFields.create({ user_id: req.user.id });
    res.status(200).json({ user: req.user, field: field });
});

const getUserFields = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400).send(" user from the request is not found");


    }

    const userFields = await UserFields.findOne({ user_id: req.user.id });
    res.status(200).json({  userFields });

});
const getUserFieldsByUserId = asyncHandler(async (req, res) => {
    if (!req.params.user_id) {
        res.status(400).send(" all fields are required");


    }
   
    const userFields = await UserFields.findOne({ user_id: req.params.user_id });
    console.log(userFields);
    res.status(200).json({ userFields });

});
const addToFavoriteArticles = asyncHandler(async (req, res) => {
    const { articleId } = req.body;
    if (!req.user) {
        res.status(400).send(" user from the request is not found");


    }

    if (!articleId) {

        res.status(400).send("All fields are required");




    }


    try {
        const updatedUserField = await UserFields.findOneAndUpdate(
            { user_id: req.user.id },
            { $addToSet: { favoriteArticles: articleId } },
            { new: true, upsert: true }
        );

        res.status(200).json({updatedUserField});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }


});

const removeFromFavoriteArticles = asyncHandler(async (req, res) => {
    // console.log("remove from favorite articles");
    const { articleId } = req.body;
    if (!req.user) {
        res.status(400).send(" user from the request is not found");


    }

    if (!articleId) {

        res.status(400).send("All fields are required");




    }


    try {
        const updatedUserField = await UserFields.findOneAndUpdate(
            { user_id: req.user.id },
            { $pull: { favoriteArticles: articleId } },
            { new: true, upsert: true }
        );
        // console.log(updatedUserField);

        res.status(200).json({updatedUserField});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }


});



const addSearchTerm = asyncHandler(async (req, res) => {
    const { searchTerm } = req.body;
    console.log(searchTerm);


    if (!req.user || !req.user.id) {
        res.status(400).send("User from the request is not found or doesn't have an ID");
        return;
    }

    if (!searchTerm) {
        res.status(400).send("Search term is required");
        return;
    }

    try {
        const updatedUserField = await UserFields.findOneAndUpdate(
            { user_id: req.user.id },
            { $addToSet: { recentSearches: searchTerm } },
            { new: true, upsert: true }
        );

        res.status(200).json({ recentSearches: updatedUserField.recentSearches });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// Backend route to handle the deletion of a recent search term
const deleteSearchTerm = asyncHandler(async (req, res) => {
    const { searchTerm } = req.params;
    // console.log(searchTerm);
    if (!req.user || !req.user.id) {
        res.status(400).send("User from the request is not found or doesn't have an ID");
        return;
    }

    if (!searchTerm) {
        res.status(400).send("Search term is required");
        return;
    }

    try {
        const updatedUserField = await UserFields.findOneAndUpdate(
            { user_id: req.user.id },
            { $pull: { recentSearches: searchTerm } },
            { new: true, upsert: true }
        );

        res.status(200).json({ recentSearches: updatedUserField.recentSearches });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = { addUserFields, getUserFields, getUserFieldsByUserId, addSearchTerm, addToFavoriteArticles, removeFromFavoriteArticles, deleteSearchTerm };