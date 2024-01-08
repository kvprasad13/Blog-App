import { Link } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBack2Fill } from "react-icons/ri";
const Recent = ({user, recentSearches, setRecentSearches }) => {
    

    useEffect(() => {

        const getAllRecentSearches = async () => {
            
            const accessToken = user&&user.accessToken;
            if (!accessToken) return;

            try {
              

                const res = await axios.get(`http://localhost:8000/api/userFields`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                // console.log(res)
                if (res.status === 200) {
                    setRecentSearches(res.data.userFields.recentSearches);

                }
            }
            catch (err) {
                // console.error(err);
            }
        };




        getAllRecentSearches();

    }, []);
    // Frontend code triggers this function to delete a recent search term
    const handleSearchTermDeleteClick = async (searchTerm) => {

        const accessToken = user&&user.accessToken;

        try {
            console.log(searchTerm);
            const res = await axios.delete(`http://localhost:8000/api/userFields/recentSearches/searchTerm/${searchTerm}`,{
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
               
            });

            if (res.status === 200) {
                setRecentSearches(res.data.recentSearches);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return <div className='domains-container'>
        <h1>Recent</h1>

        <div className='recent-search-list'>

            {recentSearches.map((searchTerm, index) => (

                <div key={index} className='recent-search'>
                    <p>{searchTerm}</p>
                    <RiDeleteBack2Fill onClick={() => handleSearchTermDeleteClick(searchTerm)} className="react-icon"  />
                    

                </div>

            ))}

        </div>

    </div>
}
export default Recent;