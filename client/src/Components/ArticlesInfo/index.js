import { Link } from "react-router-dom";
import "./index.css"
import axios from "axios";
import { useEffect } from 'react';




import BlogPost from '../BlogPost/index.js';
const ArticlesInfo = ({ user, articles, setArticles }) => {




    useEffect(() => {

        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/articles");


                setArticles(response.data);




            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchArticles();
    }, []);


    return <div className="articleInfo-container">{articles.map((blog, index) => (


        <div key={blog._id}>
            {/* {console.log(blog)} */}
            <Link to={`/${blog.username}/${(blog.title + " " + blog._id).trim().replace(/ /g, '-')}`}>

                <BlogPost title={blog.title} content={blog.content} updatedAt={blog.updatedAt} user_id={blog.user_id} />
            </Link>
        </div>



    ))


    }
    </div>

}
export default ArticlesInfo;