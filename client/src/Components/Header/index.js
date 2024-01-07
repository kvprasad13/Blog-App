import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import btLogo from '../../assets/images/btlogo.jpg';
import searchIcon from '../../assets/images/search-icon.jpg';
import defaultUserImage from '../../assets/images/user.jpeg';
import { TfiWrite } from "react-icons/tfi";
import './index.css';
import axios from 'axios';



const Header = ({ user, articles, setArticles, setRecentSearches }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();





    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {


            handleSearchIconClick();

        }
    };
    const handleChange = (event) => {
        setSearchTerm(event.target.value);

    }



    const handleSearchIconClick = () => {
        // console.log(`Searching for: ${searchTerm}`);
        console.log("Icon clicked:");
        console.log('Search Term:', searchTerm);
        const accessToken = sessionStorage.getItem('access_token');

        const fetchArticlesBySearch = async () => {
            try {


                const res = await axios.get(`http://localhost:8000/api/articles/search/?t=${searchTerm}&user_id=${user.id}`);
                try {

                    const addRecentSearchResponse = await axios.post('http://localhost:8000/api/userFields/recentSearches', { searchTerm }, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    console.log(addRecentSearchResponse);;
                    if (addRecentSearchResponse.status === 200) {
                        setRecentSearches(addRecentSearchResponse.data.recentSearches);
                    }

                }
                catch (err) {

                }

                setArticles(res.data);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchArticlesBySearch();
    }

    return (
        <div className='header-container'>
            <div className="company-logo-container">
                <img className='company-logo-image' src={btLogo} alt="company-logo" />
                <h1>blogger</h1>
            </div>
            <div className='search-box-container'>
                <input
                    id='search-box'
                    type="text"
                    placeholder="Search"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                <img className='search-icon-image' src={searchIcon} alt="search-icon" onClick={handleSearchIconClick} />
            </div>
            <div className='header-right-container'>
                <div className='article-write-container' onClick={() => navigate('new-story')}><TfiWrite size={23} color='gray' /> <div>Write</div></div>

                <div className='user-image-container' onClick={() => { navigate(`${user.username}`) }}><img src={defaultUserImage} alt="" /></div>
            </div>


        </div>
    );
};

export default Header;
