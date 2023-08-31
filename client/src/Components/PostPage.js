import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostPage.css';

const PostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
   

    const handlePostClick = async () => {
        const response = await axios.post('http://localhost:8000/api/articles', { title, content });
        if (response.status === 200) {
            alert("Article posted successfully");
        } else if (response.status === 201) {
            alert("Article already exists");
        } else {
            alert("Getting article failed", response.status);
        }
        // console.log(title);
        // console.log(content);
        setTitle("");
        setContent("");
    };

    return (
        <div className="container">
            <h1>Create a new Article</h1>
            <div className="input-wrapper">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="input"
                />
            </div>
            <div className="input-wrapper content-input">
                <label>Content:</label>
                <input
                    type="text"
                    value={content}
                    onChange={handleContentChange}
                    className="input"
                />
            </div>
            <div className="button-wrapper">
              
                <button onClick={handlePostClick} className="button">
                    Post
                </button>
            </div>
        </div>
    );
};

export default PostPage;
