import '../styles/Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import bbLogo from '../assets/images/bbLogo.jpg';
import searchIcon from '../assets/images/search-icon.jpg';
const Header = () => {
    return <><div className='header-container'>
        {/* <img src="./bbLogo.jpg" alt="bb-logo" /> */}
        <div className="bblogo-container"><img className='bblogo-image' src={bbLogo} alt="bb-logo" /><p>BlogBox</p></div>
        <div className='search-box-container'>
            <input id='search-box' type="text" placeholder="Search " />
           <img className='search-icon-image' src={searchIcon} alt="search-icon" />

        </div>
           <div className='signin-signup-buttons'>
            <Link to="/signin"><button className='signin-button'>Sign In</button></Link>
            <Link to='/signup'><button className='signup-button' >Sign Up</button></Link>

        </div>
        {/* <img src="./bbLogo.jpg" alt="bb-logo" /> */}
    </div>

    </>
};

export default Header;