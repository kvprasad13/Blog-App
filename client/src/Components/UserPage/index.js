


import React, { useState } from 'react';
import './index.css';
import Header from '../Header/index.js';
const Home = () => {
    return <div>Home Content</div>
}
const About = () => {
    return <div>About Content</div>
};
const Favorites = () => {
    return <div>Favorites Content</div>
};
const UserPage = ({ user, articles, setArticles, recentSearches,setRecentSearches }) => {
    const [selectedTab, setSelectedTab] = useState('home');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
  

    return <main className="user-page-container">
        
        <div>Header</div>


        <div className='main-container'>
            <main className="left-sidebar">

                <nav>
          
                    <button
                        onClick={() => handleTabClick('home')}
                        style={selectedTab === 'home' ? { borderBottom: '1px solid rgb(0, 0, 0)' } : {}}
                    >
                        Home
                    </button>

                    <button onClick={() => handleTabClick('favorites')} style={selectedTab === 'favorites' ? { borderBottom: '1px solid rgb(0, 0, 0)' } : {}}>Favorites</button>
                    <button onClick={() => handleTabClick('about')} style={selectedTab === 'about' ? { borderBottom: '1px solid rgb(0, 0, 0)' } : {}}>About</button>
                </nav>
                <div className='content-container'>
                    {selectedTab === 'home' && <Home  />}
                    {selectedTab === 'about' && <About />}
                    {selectedTab === 'favorites' && <Favorites />}
                </div>
            </main>
            <div className="right-sidebar">
                sidebar

            </div>
        </div>
        

    </main>

};
export default UserPage;