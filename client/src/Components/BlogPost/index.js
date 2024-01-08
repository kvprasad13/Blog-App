// src/components/BlogPost.js

import { useState, React } from 'react';
import './index.css'; // Import the CSS file
import userDefaultIcon from '../.././assets/images/user.jpeg';
import { getUserNameByUserId, getLocalUpdatedDateToRenderInAuthorDetails, getTimeTakenToReadBlogInStringFormat } from '../.././constants/userDefinedFunctions.js';
import { FaSquareFull } from "react-icons/fa";
// import React from 'react';
import { useNavigate } from 'react-router-dom';
const BlogPost = ({ title, content, user_id, updatedAt }) => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const usernamePromise = async () => {
        try {
            const username = await getUserNameByUserId(user_id);

            setUsername(username);

        } catch (error) {

            console.error('Error:', error)
            return null;
        }
    };
    usernamePromise();











    return (
        <div className="blog-post">
            <div className='author-container'>
                <div className='author-image-container' onClick={(event) => { event.preventDefault(); navigate(`/@${username}`) }}><img src={userDefaultIcon} alt="" /></div>
                <div className='author-username' onClick={(event) => { event.preventDefault(); navigate(`/@${username}`) }}>{username}</div>
                <div className='separator'><FaSquareFull size={2.4} color='gray' /></div>
                <div className='author-updatedDate'>{getLocalUpdatedDateToRenderInAuthorDetails(updatedAt)}</div>
            </div>
            <div>
                <h2>{title}</h2>
                <p>{content.substring(0, Math.min(200, content.length)) + (content.length >= 200 ? ('...') : '')}</p>
            </div>
            <div className='info-actions'>
                <div></div>
                <div className='time-taken'>{getTimeTakenToReadBlogInStringFormat(content) }</div>
            </div>
        </div>
    );
};

export default BlogPost;
