import NavBarArticlesInfo from '../NavBarArticlesInfo/index.js';
import './index.css';
import RecentSearches from '../RecentSearches/index.js';

const BodyPage = ({ user, articles, setArticles, isDialogOpen, setDialogOpen, recentSearches, setRecentSearches }) => {



    return <div className="body-page-container">

        <NavBarArticlesInfo user={user} articles={articles} setArticles={setArticles} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
        <RecentSearches user={ user} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />
    </div>

}


export default BodyPage;