// NewStory.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the CSS file

import Header from '../Header/index.js';
const NewStory = ({ user, articles, setArticles, recentSearches, setRecentSearches }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            if (window.confirm('you need to be logged in ')) {
                navigate('/auth/login');
            }
        }


        else {

            const accessToken = user && user.accessToken;

            try {
                const response = await axios.post('http://localhost:8000/api/articles', { title, content }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.status === 201) {
                    alert("Article posted successfully");
                } else {
                    alert("Getting article failed", response.status);
                }
                setTitle("");
                setContent("");
                navigate('/');
            }
            catch (error) {
                if (error.response.status === 409) {
                    alert("Article already exists");
                }
                else if (error.response.status === 403) {
                    alert("User is Authorized");
                }
                else {
                    console.log(error);
                }
            }
        }
    }

    return (
        <>
         <Header user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />
          
        <form className="new-story-form" onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </label>
            <br />
            <label>
                Content:
                <textarea
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                />
            </label>
            <br />

            <div className='action-buttons'>
                <button type="button" className = "back-button" onClick={()=>{navigate('/')}}>Back</button>
                <button type="submit" className="submit-button">Submit </button>
            </div>
            </form>
        </>
    );
};

export default NewStory;
