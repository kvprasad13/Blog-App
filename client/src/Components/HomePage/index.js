import { useEffect, useState } from 'react';
import Header from '../Header/index.js';
import Promotion from '../Promotion/index.jsx';
import BodyPage from '../BodyPage/index.js';



const HomePage = ({ user, articles, setArticles, recentSearches, setRecentSearches }) => {

    const [displayPromotion, setDisplayPromotion] = useState(true);

    return (
        <>
            <Header user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />
            {displayPromotion && (
                <Promotion
                    displayPromotion={displayPromotion}
                    setDisplayPromotion={setDisplayPromotion}
                />
            )}
            <BodyPage user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />
        </>
    );
};

export default HomePage;
