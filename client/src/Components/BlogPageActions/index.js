
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment, FaRegComment } from 'react-icons/fa6';
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBin6Line, RiDeleteBin6Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useState, React, useEffect } from 'react';
import axios from 'axios';
import './index.css';



const BlogPageActions = ({ blogId,user, commentCount, openCommentContainer,setOpenCommentContainer }) => {



    const navigate = useNavigate();
   
    const [favoriteArticles, setFavoriteArticles] = useState([]);

    const saved = favoriteArticles.includes(blogId);
    const [clappedUserIDs, setClappedUserIDs] = useState([] );
    const isUserClapped = clappedUserIDs.includes(user.id);

   
    const iconColor = isUserClapped ? 'black' : 'gray';
    // console.log(isUserClapped + " " + iconColor);

   


    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');

        const getInitialClaps = async () => {
            // console.log('getInitialClaps' + blogId);
            try {
                const response = await axios.get(`http://localhost:8000/api/articles/article/clap/articleId/${blogId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                // console.log(response);
                if (response.status === 200) {
                    setClappedUserIDs(response.data.claps);
                } else {
                    alert(response);
                    console.log(response);
                }
            } catch (err) {
                console.log(err);
                alert(err.response.data);
            }
        };

        if (blogId) {
            getInitialClaps();
        }
    }, [blogId]);  // Add blogId as a dependency

    useEffect(() => {
        const getFavoriteArticles = async() => {
            const accessToken = sessionStorage.getItem('access_token');

            try {

                const res = await axios.get(`http://localhost:8000/api/userFields/`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                // console.log(res);
                
                if (res.status === 200) {
                    setFavoriteArticles(res.data.userFields.favoriteArticles);
                    
                   
                }
            }
            catch (err) { 
                console.error(err);
            }
        }
        
        getFavoriteArticles();
     }, []);
  
   
    const handleClapClick = async () => {
        console.log("clapClicked");
        const accessToken = sessionStorage.getItem('access_token');

        try {
            console.log("i am in try block");

            const response = await axios.put(`http://localhost:8000/api/articles/article/clap/articleId/${blogId}`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            console.log(response);

            if (response.status === 200) {
                setClappedUserIDs(response.data.claps);
            } else {
                alert(response);
                console.log(response);
            }
        } catch (err) {
            console.log(err);
            alert(err.response.data);
        };
    }

    const handleAddToFavoriteClick = async() => {
        const accessToken = sessionStorage.getItem('access_token');

        try {
            console.log(" add to favorite");

            const res = await axios.post(`http://localhost:8000/api/userFields/favoriteArticles`, {articleId:blogId},{
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            console.log(res);
            if (res.status === 200) {
              
               setFavoriteArticles(res.data.updatedUserField.favoriteArticles);
            }
        }
        catch (err) {
            console.error(err);
        }
        
    }; const handleRemoveFromFavoriteClick = async () => {
        const accessToken = sessionStorage.getItem('access_token');

        try {
            console.log("remove from favorite");

            const res = await axios.delete(`http://localhost:8000/api/userFields/favoriteArticles`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: { articleId: blogId } // Include data in the request parameters
            });

            console.log(res);

            if (res.status === 200) {
                setFavoriteArticles(res.data.updatedUserField.favoriteArticles);

                                  
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleDeleteBlogClick = async () => {

        const accessToken = sessionStorage.getItem('access_token');

        try {

            const response = await axios.delete(`http://localhost:8000/api/articles/article/articleId/${blogId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
          
            if (response.status === 200) {

                alert("article deleted successfully");

            }
            else if (response.status === 404) {
                alert('Article not found');
            }
            else {
                alert(response);
                console.log(response);
            }
            navigate('/');

        }
        catch (err) {
            // if(err.response.)
            if (err.response.status === 403) {
                console.log(err);
                alert(err.response.data);
            }
            else {

                console.log(err);
            }
        };


    };
    const handleTopCommentIconClick = (event) => {
        event.preventDefault();
        setOpenCommentContainer(!openCommentContainer);


    }

    // console.log(favoriteArticles);

    return (

        < main className="actions-container" >
            <div className="first-container">
              
                    <div className="react-icon-container" onClick={handleClapClick}>
                    <FaHandsClapping className='react-icon' size={22} style={{ color: iconColor }} />
                    
                    <div className='clap-count-container number-container'>{clappedUserIDs.length}</div></div>
                <div className="react-icon-container" tooltip='respond' onClick={handleTopCommentIconClick}><FaRegComment className='react-icon' size={22} /> {commentCount !== 0 && <div className='comment-count-container number-container'>{commentCount}</div>}</div>
            </div>

            <div className="second-container">
               
                {saved ? <div className="react-icon-container" onClick={handleRemoveFromFavoriteClick} ><MdOutlineBookmarkAdded className='react-icon' size={22} /></div> :
                    <div className="react-icon-container" onClick={handleAddToFavoriteClick}><MdOutlineBookmarkAdd className='react-icon' size={22} /></div>}
                <div className="react-icon-container" tooltip='edit' ><Link to={`/edit-story/${blogId}`}><TbEdit className='react-icon' size={22} /></Link></div>
                <div className="react-icon-container" tooltip='delete' onClick={handleDeleteBlogClick}><RiDeleteBin6Line className='react-icon' size={22} /></div>
            </div>
        </main >
    );
};

export default BlogPageActions;
