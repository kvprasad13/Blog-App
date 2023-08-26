import { Link } from "react-router-dom";
import "../styles/ArticlesInfo.css"

const ArticlesInfo = ({ articles }) => {


    // console.log(articles.length);
    return <div className="articleInfo-container">{articles.map((article, index) => (
        <Link to={`/articlePage/${article.title}`} class ="sub-articleInfo-link">
            < div class="sub-articleInfo-container" key = { article.title } >
                <h1>{article.title}</h1>
                <p>{article.text.substring(0, Math.min(180, article.text.length)) + "..."}</p>

            </div ></Link>))
            

        }</div>
    // return <h1>{articles[0].text}</h1>
}
export default ArticlesInfo;
