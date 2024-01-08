
import ArticlesGroupComponent from '../ArticlesGroupComponent/index.js';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
const Favorites = ({ user,authorUserId }) => {
    const [Blogs, setBlogs] = useState([]);

    const fetchBlog = async (blogId) => {
        try {
            // console.log("At fetch Blogs" + blogId);

            const response = await axios.get(`http://localhost:8000/api/articles/article/articleId/${blogId}`);


            setBlogs((prevBlogs) => [...prevBlogs, { ...response.data.article }]);

        } catch (error) {
            console.error("Error fetching Blogs:", error);
        }
    };


    useEffect(() => {
        const getAuthorFavoriteBlogs = async (authorUserId) => {

            const accessToken = user && user.accessToken ;

            try {
                const res = await axios.get(
                    `http://localhost:8000/api/userFields/user_id/${authorUserId}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        }
                    }
                );

                if (res.status === 200) {
                    const favoriteBlogsIDs = res.data.userFields.favoriteArticles;
                    // console.log("favoriteBlogIds" + favoriteBlogsIDs);
                    try {

                        favoriteBlogsIDs.forEach(blogId => {
                            fetchBlog(blogId)
                        });
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            } catch (err) {
                console.error(err);
            }





        };
        if (authorUserId)
            getAuthorFavoriteBlogs(authorUserId);
    }, []);
    // console.log(Blogs);

    return <ArticlesGroupComponent Blogs={Blogs} />;

};

export default Favorites;