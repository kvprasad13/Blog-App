
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import './index.css';
import { FaSquareFull } from "react-icons/fa";
import userDefaultIcon from '../.././assets/images/user.jpeg';
import BlogPageActions from '../BlogPageActions/index.js';
import Comments from '../Comments/index.js';
import Header from '../Header/index.js';
import {  getLocalUpdatedDateToRenderInAuthorDetails, getTimeTakenToReadBlogInStringFormat } from '../.././constants/userDefinedFunctions.js';
const BlogPage = ({ user, articles, setArticles, recentSearches,setRecentSearches }) => {
    const { blogTitle } = useParams();
    const navigate = useNavigate();
    const [openCommentContainer, setOpenCommentContainer] = useState(false);
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment && backendComment.parent_id === null);




    // console.log(blogTitle);
    // const user = JSON.parse(sessionStorage.getItem('user'));

    const blogId = (function () {
        const arr = blogTitle.split('-');

        return arr.slice(-1)[0];
    })();


    const [Blog, setBlog] = useState({}); // Initialize state to hold articles
  




    useEffect(() => {

        const fetchBlog = async () => {
            try {
              
                const response = await axios.get(`http://localhost:8000/api/articles/article/articleId/${blogId}`);
             
                setBlog(response.data.article); 
                
            } catch (error) {
                console.error("Error fetching Blogs:", error);
            }
        };

        fetchBlog();
    }, []);
    // console.log(Blog.claps);


    return <div>
        <Header user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />
    <main className="blog-page-container">
        

        <header className='blog-page-container-header'>
            <div className='title'> <h1>{Blog.title}</h1></div>
            <div className='user-blog-details'>
                    <div className='author-icon-container' onClick={() => { navigate(`/@${Blog.username}`) }}>
                    <img src={userDefaultIcon} alt="" />
                </div>
                    <div className='username' onClick={() => { navigate(`/@${Blog.username}`) }}>{Blog.username}</div>
                <div className='timeTaken-updatedAt'>
                <div className='separator'><FaSquareFull size={2.4} color='gray' /></div>
                <div className='time-taken'>{Blog.content && getTimeTakenToReadBlogInStringFormat(Blog.content)}</div>
                <div className='separator'><FaSquareFull size={2.4} color='gray' /></div>
                <div className='updatedAt'>{getLocalUpdatedDateToRenderInAuthorDetails(Blog.updatedAt)} </div>
                </div>
                </div>

            <BlogPageActions blogId={Blog._id} user={user} commentCount={rootComments.length} openCommentContainer={openCommentContainer} setOpenCommentContainer={setOpenCommentContainer}  />
        </header>
        <main>

            <p className='blog-content'>{Blog.content}</p>
        </main>

        {openCommentContainer && <Comments user={user}  blogId={blogId} backendComments={backendComments} setBackendComments={setBackendComments} rootComments={rootComments}/>}


        </main>
    </div>

}

export default BlogPage;