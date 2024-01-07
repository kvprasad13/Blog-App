
import ArticlesInfo from '../ArticlesInfo/index.js';
// import articles from '../Data/ArticlesData.js';
import './index.css';
import userIcon from '../../assets/images/user.jpeg';

import { useState } from 'react';
import axios from 'axios';

const NavBarArticlesInfo = ({ user, articles, setArticles }) => {



    return <div>


        <ArticlesInfo user={user} articles={articles} setArticles={setArticles}></ArticlesInfo>
    </div>
}
export default NavBarArticlesInfo;