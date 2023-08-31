import { Link } from "react-router-dom";
import "../styles/ArticlesInfo.css"
import axios from "axios";
import { useEffect, useState } from 'react';
import dropDownIcon from "../assets/svg/drop-down-icon.png";
const ArticlesInfo = () => {

    const [articles, setArticles] = useState([]); // Initialize state to hold articles
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (articleId) => {
        setOpenDropdownId(openDropdownId === articleId ? null : articleId);
    };
    useEffect(() => {
        // Fetch articles when the component mounts
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/articles");
                console.log(response.data);
                setArticles(response.data); // Update state with fetched articles
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, [articles]);

    // const [isOpen, setIsOpen] = useState(false);
    
   
   
    
    const handleEditClick = async (articleId) => {
        
        
        // console.log(articleId);
        
       

    };
    const handleDeleteClick = async(articleId) => {
        console.log(articleId);
        try {
            const response = await axios.delete(`http://localhost:8000/api/articles/${articleId}`);
            if (response.status === 200) {

                setArticles((prevArticles) => prevArticles.filter(article => article.id !== articleId));
               
                alert("article deleted successfully");
                
            }
            else if (response.status === 404) {
                alert('Article not found');
            };
        }
        catch (err) {
            console.log(err);
        };


    }
    return <div className="articleInfo-container">{articles.map((article, index) => (
        <div className = "sub-articleInfo-link" >
            < div className="sub-articleInfo-container" key={article.title} >
                <div className="article-head-container">
                    <Link className="sub-articleInfo-link" to={`/articlePage/${article._id}`}><h1 >{article.title} </h1></Link> 
                    <div className="dropdown">
                        <button className="dropdown-toggle" onClick={() => toggleDropdown(article._id)}>
                            <img className="drop-down-icon-image" src={dropDownIcon} alt="drop-down-icon" />
                        </button>
                        {openDropdownId === article._id && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li ><Link className="edit-item" to={`/edit/${article._id}`}>Edit</Link></li>
                                    <li onClick={() => handleDeleteClick( article._id)}>Delete</li>
                                </ul>
                            </div>
                        )}
                    </div></div>
                <Link className="sub-articleInfo-link" to={`/articlePage/${article._id}`}> <p>{article.content ? article.content.substring(0, Math.min(180, article.content.length)) + "..." : ""}</p></Link>

            </div ></div>))


    }</div>
    // return <h1>{articles[0].content}</h1>
    // return <div></div>
}
export default ArticlesInfo;