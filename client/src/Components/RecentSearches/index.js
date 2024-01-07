import { Link } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Recent = ({ recentSearches, setRecentSearches }) => {
    

    useEffect(() => {

        const getAllRecentSearches = async () => {
            const accessToken = sessionStorage.getItem('access_token');

            try {
              

                const res = await axios.get(`http://localhost:8000/api/userFields`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                console.log(res)
                if (res.status === 200) {
                    setRecentSearches(res.data.userFields.recentSearches);

                }
            }
            catch (err) {
                console.error(err);
            }
        };




        getAllRecentSearches();

    }, []);
    return <div className='domains-container'>
        <h1>Recent</h1>

        <div className='recent-search-list'>

            {recentSearches.map((searchTerm, index) => (

                <div key={index} className='recent-search'>
                    {searchTerm}
                </div>

            ))}

        </div>

    </div>
}
export default Recent;