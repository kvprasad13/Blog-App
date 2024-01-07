
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import './index.css';
import { FaSquareFull } from "react-icons/fa";
import userDefaultIcon from '../.././assets/images/user.jpeg';
import BlogPageActions from '../BlogPageActions/index.js';
import Comments from '../Comments/index.js';
import { getUserNameByUserId, getLocalUpdatedDateToRenderInAuthorDetails, getTimeTakenToReadBlogInStringFormat } from '../.././constants/userDefinedFunctions.js';
const BlogPage = () => {
    const { blogTitle } = useParams();
    const [openCommentContainer, setOpenCommentContainer] = useState(false);
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment && backendComment.parent_id === null);




    // console.log(blogTitle);
    const user = JSON.parse(sessionStorage.getItem('user'));

    const blogId = (function () {
        const arr = blogTitle.split('-');

        return arr.slice(-1)[0];
    })();


    const [Blog, setBlog] = useState({}); // Initialize state to hold articles
  
    const [username, setUsername] = useState(null);

    const usernamePromise = async () => {
        try {
            const username = await getUserNameByUserId(Blog.user_id);

            setUsername(username);

        } catch (error) {

            console.error('Error:', error)
            return null;
        }
    };
    usernamePromise();
    // console.log(Blog);




    useEffect(() => {

        const fetchBlog = async () => {
            try {
                console.log("At fetch Blogs" + blogId);
                //   http://localhost:8000/api/articles/article/articleId/65983c1c3cc8ced9d1ce343b
                const response = await axios.get(`http://localhost:8000/api/articles/article/articleId/${blogId}`);
                // console.log(response.data);
                setBlog(response.data); 
                
            } catch (error) {
                console.error("Error fetching Blogs:", error);
            }
        };

        fetchBlog();
    }, []);
    // console.log(Blog.claps);


    return <main className="blog-page-container">
        <header className='blog-page-container-header'>
            <div className='title'> <h1>{Blog.title}</h1></div>
            <div className='user-blog-details'>
                <div className='author-icon-container'>
                    <img src={userDefaultIcon} alt="" />
                </div>
                <div className='username'>{username}</div>
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

}

export default BlogPage;