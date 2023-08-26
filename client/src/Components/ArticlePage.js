import articles from "../Data/ArticlesData";
import { useParams } from 'react-router-dom';
const ArticlePage = () => {

    const { articleId } = useParams();
    const article = articles.find(article => articleId === article.title);
    return <div className="">

       
        <h1>{article.title}</h1>
        <p>{article.text}</p>
    </div>

}

export default ArticlePage;