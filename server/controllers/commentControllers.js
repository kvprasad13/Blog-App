const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');
// Create a new comment
const createComment = asyncHandler(async (req, res) => {
    const { articleId } = req.params;

    const newComment = {
        ...req.body,
        user_id: req.user.id,
        username: req.user.username,
        article_id: articleId
    };
    console.log({ comment: newComment });



    if (!newComment || !articleId) {
        res.status(400).send("All fields are required");
        return;
    }

    try {


        const comment = await Comment.create(newComment);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

// Get all comments for a specific article
const getAllComments = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    console.log(articleId);





    if (!articleId) {
        res.status(400).send("All fields are required");
        return;
    }

    try {
        const comments = await Comment.find({ article_id: articleId });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const { body } = req.body;



    if (!commentId || !body) {
        res.status(400).send("All fields are required");
        return;
    }
    const comment = await Comment.findById({ _id: commentId });
    if (!comment) {
        res.status(404);
        throw new Error("comment not found");
    }
    if (comment.user_id.toString() !== req.user.id) {
        res.status(403).send("User don't have permission to update other user comment");

    }

    try {

        const comment = await Comment.findByIdAndUpdate(
            commentId,
            { $set: { body: body } },
            { new: true }
        );


        res.status(200).json({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;






    if (!commentId) {
        res.status(400).send("All fields are required");
        return;
    }
    const comment = await Comment.findById({ _id: commentId });
    if (!comment) {
        res.status(404);
        throw new Error("comment not found");
    }
    if (comment.user_id.toString() !== req.user.id) {
        res.status(403).send("User don't have permission to update other user comment");

    }

    try {
        await deleteCommentAndChildren(commentId);


        res.status(204).send({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
const deleteCommentAndChildren = async (commentId) => {
    const comment = await Comment.findById({ _id: commentId });

    if (!comment) {
        return; // Comment not found, nothing to delete
    }

    // Delete child comments recursively
    for (const child of await Comment.find({ parent_id: comment._id })) {
        await deleteCommentAndChildren(child._id);
    }

    // Delete the comment itself
    await Comment.findByIdAndDelete({ _id: commentId });
};

const updateLikes = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;


    if (!userId || !commentId) {
        res.status(400).send("All fields are required");
        return;
    }

    try {
        const comment = await Comment.findByIdAndUpdate(
            { _id: commentId },
            {
                $addToSet: { likes: userId },
                $pull: { dislikes: userId }
            },
            { new: true });

        // console.log(comment);

        res.status(200).json({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


const updateDisLikes = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    if (!userId || !commentId) {
        res.status(400).send("All fields are required");
        return;
    }

    try {
        const comment = await Comment.findByIdAndUpdate(
            { _id: commentId },
            {
                $addToSet: { dislikes: userId },
                $pull: { likes: userId }
            },
            { new: true });

        // console.log(comment);
        res.status(200).json({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = { createComment, updateComment, deleteComment, getAllComments, updateLikes, updateDisLikes };
