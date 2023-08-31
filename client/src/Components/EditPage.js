import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/PostPage.css';

const EditPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { articleId } = useParams();
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (err) {
                console.log(err);
            }
        };

        fetchArticle();
    }, [articleId]);
    

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleEditClick = async () => {


        try {
            const response = await axios.put(`http://localhost:8000/api/articles/${articleId}`, { title, content });
            if (response.status === 200) {
                alert('Article edited successfully');
            }
            else if (response.status === 404) {
                alert('Article not found');
            };
        }
        catch (err) {
            console.log(err);
        };

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

                <button onClick={handleEditClick} className="button">
                   Edit
                </button>
            </div>
        </div>
    );
};

export default EditPage;
