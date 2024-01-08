


import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/index.js';

import './index.css';
import Favorites from '../UserPageFavorites/index.js';
import Home from '../UserPageHome/index.js';
import axios from 'axios';
import authorDefaultIcon from '../../assets/images/user.jpeg';

const About = () => {
    return <div>Nothing mentioned</div>
};
const UserPage = ({ user,setUser, articles, setArticles, recentSearches, setRecentSearches }) => {
    const [selectedTab, setSelectedTab] = useState('about');
    const authorName = useParams().username.split('@')[1];
    const [authorUserId, setAuthorUserId] = useState(undefined);
    const navigate = useNavigate();


    const canEditProfile = authorName === (user && user.username);



    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    useEffect(() => {

        const getAuthorUserId = async (authorName) => {
            const accessToken = user && user.accessToken;

            try {
                const res = await axios.get(
                    `http://localhost:8000/api/accounts/user/username/${authorName}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        }
                    }
                );
                // console.log(res);
                if (res.status === 200) {
                    setAuthorUserId(res.data.user._id);
                }
            }
            catch (err) {


            }



        }
        getAuthorUserId(authorName);


    }, []);
    // console.log("author id"+authorUserId);


    return <main className="user-page-container">

        <Header user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />



        <div className='main-container'>
            <main className="left-sidebar">

                <div className='authorName-container'>{authorName}</div>

                <nav>

                    <button
                        onClick={() => handleTabClick('home')}
                        style={selectedTab === 'home' ? { color: 'black', borderBottom: '1px solid rgb(0, 0, 0)' } : {}}
                    >
                        Home
                    </button>

                    <button onClick={() => handleTabClick('favorites')} style={selectedTab === 'favorites' ? { color: 'black', borderBottom: '1px solid rgb(0, 0, 0)' } : {}}>Favorites</button>
                    <button onClick={() => handleTabClick('about')} style={selectedTab === 'about' ? { color: 'black', borderBottom: '1px solid rgb(0, 0, 0)' } : {}}>About</button>
                </nav>
                <div className='content-container'>
                    {selectedTab === 'home' && <Home user={user} authorUserId={authorUserId} />}
                    {selectedTab === 'about' && <About />}
                    {selectedTab === 'favorites' && <Favorites user={user} authorUserId={authorUserId} />}
                </div>
            </main>

            {/* side bar */}

            <div className="right-sidebar">

                <div className='author-image-container'><img src={authorDefaultIcon} alt="author-image" className='author-image' /></div>
                <div className='authorName-container'>{authorName}</div>
                {canEditProfile && <div className='edit-profile-container'><a href={`/@${authorName}`}>Edit Profile</a></div>}

                {user && <div className='signOut-container'><button onClick={() => {
                    setUser(undefined);
                    navigate('/');
                }}>Sign Out</button></div>}
            </div>
        </div>


    </main>

};
export default UserPage;