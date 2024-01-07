
import React from 'react'
import './index.css';

import { PiStarFourFill } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
const Promotion = ({displayPromotion,setDisplayPromotion}) => {
    const pricePerWeek = 1;
    
    return (
        <div className='promotion-div-container-close'>
            <div></div>
        <div className='promotion-container'>
            
            <div><PiStarFourFill size={16} color="gold" /></div>
            <div className='promotion-text'>Get unlimited access to the best of Blogger for less than ${ pricePerWeek}/week.</div>
            <div className='promotion-become-member'><a href="/">Become a member</a></div>

            </div>
            <div className='promotion-close'>
                <IoCloseOutline size={30} onClick={ ()=> setDisplayPromotion(false)} />
            </div>
            </div>
  )
}

export default Promotion;