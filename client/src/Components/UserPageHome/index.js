
import ArticlesGroupComponent from '../ArticlesGroupComponent/index.js';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
const Home = ({ user, authorUserId }) => {
    const [Blogs, setBlogs] = useState([]);
   
    useEffect(() => {
        const getUserBlogs = async (authorUserId) => {

            const accessToken = user && user.accessToken;


            try {
                const res = await axios.get(
                    `http://localhost:8000/api/articles/userArticles/user_id/${authorUserId}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        }
                    }
                );
                // console.log(res);
                if (res.status === 200) {
                    setBlogs(res.data.articles);
                }
            } catch (err) {
                console.error(err);
            }





        };
        if (authorUserId)
            getUserBlogs(authorUserId);
    }, []);
    // console.log(Blogs);


    return <ArticlesGroupComponent Blogs={Blogs} />;
}

export default Home;