
import React, { useState, useEffect } from 'react';
import './index.css';
import userIcon from '../../assets/images/user.jpeg';


import { getLocalUpdatedDateToRenderInAuthorDetails } from '../../constants/userDefinedFunctions.js';

import { BiSolidUpArrowAlt, BiSolidDownArrowAlt } from "react-icons/bi";
import { RiReplyLine } from "react-icons/ri";
import { RiReplyFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { TbMessagesOff } from "react-icons/tb";

import CommentForm from '../CommentForm/index.js';
import { useNavigate } from 'react-router-dom';

const Comment = ({blogId, comment, getReplies, replies, addComment, deleteComment, updateComment, activeComment, setActiveComment, handleUpvote, handleDownvote, user }) => {

    const navigate = useNavigate();
    const [showRepliesBoolean, setShowRepliesBoolean] = useState(false);
    const currentUserId = user&&user.id;

    const canReply = (Boolean(currentUserId) && currentUserId !== comment.user_id);

    const canEdit = (currentUserId === comment.user_id);


    const canDelete = (currentUserId === comment.user_id);
    const isUserLoggedIn = currentUserId && currentUserId !== null;
    // console.log("Current user: " + JSON.stringify(user) + "createdAt " + comment.createdAt);

    // console.log("canReply: " + canReply + " canEdit: " + canEdit + " canDelete: " + canDelete + "  currentUserId:" + currentUserId + "comment" + JSON.stringify(comment));
    // console.log(comment);
    const updatedAtString = getLocalUpdatedDateToRenderInAuthorDetails( new Date(comment.updatedAt).toLocaleDateString());
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment._id === comment._id;
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment._id === comment._id;
    





    return (
        <div className="comment">
            <div onClick={() => { navigate(`/@${comment.username}`) }}>
                <img src={userIcon} className="user-icon-image" alt="" />
            </div>
            <div className="comment-second-child" >
                <div className="username-timestamp">
                    <p className="username" onClick={() => { navigate(`/@${comment.username}`) }}>{comment.username}</p>
                    <p className="timestamp">{updatedAtString}</p>
                </div>

                {!isEditing && (<div className="comment-text">{comment.body}</div>)}
                {isEditing && (
                    <CommentForm blogId={blogId } submitLabel="Update" hasCancelButton initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment._id)} handleCancel={() => setActiveComment(null)}
                    />
                )}
                {isUserLoggedIn && (<div className="comment-actions">
                    <div className='comment-action'onClick={() => handleUpvote(comment._id)} >
                        <BiSolidUpArrowAlt className='react-icon' />
                        <div className='comment-action-text'>{comment.likes.length}</div>
                    </div>
                    <div className='comment-action'  onClick={() => handleDownvote(comment._id)}>
                        <BiSolidDownArrowAlt className='react-icon' />
                        <div className='comment-action-text'>{comment.dislikes.length}</div>
                    </div>
                    {canReply && <div
                        className="comment-action"
                        onClick={() => { setActiveComment({ _id: comment._id, type: "replying" }) }}
                    >
                        {/* onClick={handleReplyButtonClick} */}
                        <RiReplyLine className='react-icon' />
                        <div className='comment-action-text'>Reply</div>
                    </div>}

                    {replies && replies.length > 0 && (showRepliesBoolean ? 
                        <div onClick = { () => setShowRepliesBoolean(!showRepliesBoolean) } className = "comment-action"> 
                         < TbMessagesOff className='react-icon' />
                    < div className='comment-action-text'>Hide Replies</div>
                        </div> : <div onClick={() => setShowRepliesBoolean(!showRepliesBoolean)} className="comment-action">
                            <TbMessages className='react-icon' />
                            <div className='comment-action-text' >Show Replies</div></div>)}
                    {canEdit && <div className="comment-action" onClick={() => { setActiveComment({ _id: comment._id, type: "editing" }) }}>

                        {/* onClick={onReport}  */}
                        <MdEdit className='react-icon' />
                        <div className='comment-action-text'>Edit</div>
                    </div>}

                    {canDelete &&
                        <div className="comment-action" onClick={() => {
                            deleteComment(comment._id)
                        }}> <RiDeleteBin6Line className='react-icon' /> <div className='comment-action-text'>Delete</div></div>}







                </div>)}




                {
                    isReplying && (<CommentForm blogId={blogId} submitLabel="Reply" handleCancel={() => setActiveComment(null)} hasCancelButton handleSubmit={(text) => addComment(text, blogId, comment._id, comment.level)} />)
                }
            {showRepliesBoolean&&replies && replies.length > 0 && (
                    <div className="replies">
                        {replies.map(reply => (
                            <Comment key={reply._id}
                                blogId={blogId}
                                comment={reply}
                                getReplies={getReplies}
                                currentUserId={currentUserId}
                                addComment={addComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                               
                                setActiveComment={setActiveComment}
                                parentId={comment._id}
                                handleUpvote={handleUpvote}
                                handleDownvote={handleDownvote}
                               
                                replies={getReplies(reply._id)}
                                user={user}

                            />
                        ))}
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default Comment;