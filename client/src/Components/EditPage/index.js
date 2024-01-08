import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/index.js';
const EditPage = ({ user, articles, setArticles, recentSearches, setRecentSearches }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { blogId } = useParams();
    const navigate = useNavigate();
   


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(` http://localhost:8000/api/articles/article/articleId/${blogId}`);

                // console.log(response);
                setTitle(response.data.article.title);
                setContent(response.data.article.content);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchArticle();
    }, []);



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
            // console.log({ accessToken, title, content });


            try {

                const response = await axios.put(`http://localhost:8000/api/articles/article/articleId/${blogId}`, { title, content },
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                if (response.status === 200) {

                    alert('Article edited successfully');
                }
                else if (response.status === 403) {
                    alert('Article not found');
                }
                else if (response.status === 404) {
                    alert('Article not found');
                }
                else {
                    alert(response);
                    console.log(response);
                }
                setTitle("");
                setContent("");
                navigate('/');
            }
            catch (err) {
           
                if (err.response.status === 409) {
                    alert("Article already exists");
                }
                else if (err.response.status === 403) {
                    alert("User is Authorized");
                }
                else {
                    console.log(err);
                }

            };
        }


    };

    return (
        <>
            <Header user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />

        <form className="edit-story-form" onSubmit={handleSubmit}>
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
                <button type="button" className="back-button" onClick={() => { navigate('/') }}>Back</button>
                <button type="submit" className="submit-button">Submit </button>
            </div>
            </form>
        </>

    );
};

export default EditPage;
