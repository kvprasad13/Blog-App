import { useEffect, useState } from 'react';
import Header from '../Header/index.js';
import Promotion from '../Promotion/index.jsx';
import BodyPage from '../BodyPage/index.js';

import { getUserNameByUserId } from "../../constants/userDefinedFunctions.js";

const HomePage = ({ user, articles, setArticles, recentSearches, setRecentSearches }) => {

    const [displayPromotion, setDisplayPromotion] = useState(true);


    // The empty dependency array ensures this effect runs only once when the component mounts

    console.log(articles);

    useEffect(() => {
        const updateArticlesAsync = async () => {
            const updatedArticles = await Promise.all(
                articles.map(async (article) => ({
                    ...article,
                    userName: await getUserNameByUserId(article.user_id)
                }))
            );
            console.log("updatedArticles" + updatedArticles);

            setArticles(updatedArticles);
        };


        updateArticlesAsync();
    }, []);
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
