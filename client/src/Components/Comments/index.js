import { useState, React, useEffect } from 'react';
import axios from 'axios';
import CommentForm from '../CommentForm/index.js';
import Comment from '../Comment/index.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
const Comments = ({ user, blogId, backendComments, setBackendComments,rootComments }) => {


    const navigate = useNavigate();

    const [activeComment, setActiveComment] = useState(null);


    useEffect(() => {
        const getAllComments = async () => {


            const accessToken = user&&user.accessToken;
            try {
                // console.log("at getting all comments try block");

                const res = await axios.get(`http://localhost:8000/api/articles/article/comment/articleId/${blogId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (res.status === 200) {

                    setBackendComments(res.data);

                    setActiveComment(null);

                }
                else {
                    console.log(res);
                }
            }
            catch (error) {
                console.log(error);
                alert("Getting error at collecting  comments");

            }




        }
        // if (!blogId)

        getAllComments();
    }, []);


   

    const getReplies = (commentId) => {
        return backendComments
            .filter((backendComment) => backendComment && backendComment.parent_id === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    };
    const getRootCommentId = (commentId) => {
        // console.log("commentId =>" + commentId);
        // console.log(rootComments);
        const currentComment = backendComments.find((comment) => comment._id === commentId)
        // console.log(currentComment);
        if (currentComment && (!currentComment.parent_id || currentComment.parent_id === null)) return currentComment._id;
        return getRootCommentId(currentComment.parent_id);
    }

    const getCountCommentsInTree = (commentId) => {
        if (!commentId || commentId === null) return 0;
        const filteredComments = backendComments.filter((backendComment) => backendComment && backendComment.parent_id === commentId);
        if (!filteredComments || filteredComments.length === 0) return 1;
        let ans = 0;

        filteredComments.forEach((filteredComment) => {
            ans += getCountCommentsInTree(filteredComment._id);
        });

        return 1 + ans;
    }
    const addComment = async (text, blogId, parentId, parentLevel) => {
      
        const accessToken = user&&user.accessToken;
        if (!user) {
            if (window.confirm('you need to be logged in ')) {
                navigate('/auth/login');
            }
        }


        else {

            if (parentLevel && (parentLevel === 6)) {
                alert("Couldn't add a reply because you've reached maximum reply levels")
            }
            else if (parentId && parentId !== null && ((getCountCommentsInTree(getRootCommentId(parentId)) - 1) === 50)) {
                alert("Couldn't add a reply because you've reached the maximum replies");

            }
            else {
                try {
                    const newComment = {
                        body: text,
                        parent_id: parentId || null,
                        level: parentLevel === undefined ? 0 : parentLevel + 1

                    };
                    // console.log("at creating commetn"+{ newComment, blogId });
                    //   http://localhost:8000/api/articles/article/comment/articleId/6598dfe19f877d25a9f33e98
                    const res = await axios.post(`http://localhost:8000/api/articles/article/comment/articleId/${blogId}`, newComment, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    // console.log(res);
                    if (res.status === 201) {

                        setBackendComments([res.data, ...backendComments]);

                        setActiveComment(null);
                    }
                    else {
                        console.log(res);
                    }
                }
                catch (error) {
                    console.log(error);
                    alert("Getting error at creating new comment");

                }

            }
        }
    }


    const updateComment = async (text, commentId) => {

        const accessToken = user&&user.accessToken;
        try {

            const res = await axios.put(`http://localhost:8000/api/articles/article/comment/commentId/${commentId}`, { body: text }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // console.log(res);
            if (res.status === 200) {
                setBackendComments(prevComments => {
                    return prevComments.map(backendComment => {
                        if (backendComment && backendComment._id === commentId) {
                            return res.data.comment; // Updated comment from the server
                        }
                        return backendComment;
                    });
                });

                setActiveComment(null);

            }
            else {
                console.log(res);
            }
        }
        catch (error) {
            console.log(error);
            alert("Getting error at updating  comment");

        }




    }
    const deleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment")) {
            const accessToken = user&&user.accessToken;
            try {

                const res = await axios.delete(`http://localhost:8000/api/articles/article/comment/commentId/${commentId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                // console.log(res);
                if (res.status === 204) {
                    setBackendComments(prevComments => {
                        return prevComments.map(backendComment => {
                            if (backendComment && backendComment._id === commentId) {
                                return; // Updated comment from the server
                            }
                            return backendComment;
                        });
                    });

                    setActiveComment(null);


                }
                else {
                    console.log(res);
                }
            }
            catch (error) {
                console.log(error);
                alert("Getting error at deleting  comment");

            }



        }
    }



    const handleUpvote = async (commentId) => {
        const accessToken = user&&user.accessToken;
        try {

            const res = await axios.put(`http://localhost:8000/api/articles/article/comment/like/commentId/${commentId}`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // console.log(res);
            if (res.status === 200) {
                setBackendComments(prevComments => {
                    return prevComments.map(backendComment => {
                        if (backendComment && backendComment._id === commentId) {
                            return res.data.comment; // Updated comment from the server
                        }
                        return backendComment;
                    });
                });

                setActiveComment(null);


            }
            else {
                console.log(res);
            }
        }
        catch (error) {
            console.log(error);
            alert("Getting error at up voting  comment");

        }




    };

    const handleDownvote = async (commentId) => {
        const accessToken = user&&user.accessToken;
        try {

            const res = await axios.put(`http://localhost:8000/api/articles/article/comment/dislike/commentId/${commentId}`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // console.log(res);
            if (res.status === 200) {
                setBackendComments(prevComments => {
                    return prevComments.map(backendComment => {
                        if (backendComment && backendComment._id === commentId) {
                            return res.data.comment; // Updated comment from the server
                        }
                        return backendComment;
                    });
                });

                setActiveComment(null);

            }
            else {
                console.log(res);
            }
        }
        catch (error) {
            console.log(error);
            alert("Getting error at down voting  comment");

        }



    };





    return <div className="comments-section">
        <h2>Comments</h2>

        <h3>Write Comment</h3>
        <CommentForm blogId={blogId} submitLabel="Post" handleSubmit={(text) => addComment(text, blogId)} />

        {rootComments.map((rootComment) => (

            <Comment key={rootComment._id}
                blogId={blogId}

                comment={rootComment}
                getReplies={getReplies}
                replies={getReplies(rootComment._id)}


                addComment={addComment}
                updateComment={updateComment}
                deleteComment={deleteComment}

                activeComment={activeComment}
                handleDownvote={handleDownvote}
                handleUpvote={handleUpvote}

                setActiveComment={setActiveComment}
                user={user}
            />
        ))}

    </div>

};

export default Comments;