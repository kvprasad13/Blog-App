// import articles from "../Data/ArticlesData";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
const ArticlePage = () => {

    const { articleId } = useParams();
    const [article, setArticle] = useState({}); // Initialize state to hold articles

    useEffect(() => {
        // Fetch articles when the component mounts
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
                console.log(response.data);
                setArticle(response.data); // Update state with fetched articles
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);
    // const article = articles.find(article => articleId === article.title);
    return <div className="">

       
        <h1>{article.title}</h1>
        <p>{article.content}</p>
    </div>

}

export default ArticlePage;