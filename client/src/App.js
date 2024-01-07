import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './Components/SignInPage.js';
import SignUp from './Components/SignUpPage.js';
import HomePage from './Components/HomePage/index.js';
import BlogPage from './Components/BlogPage/index.js';

import EditPage from './Components/EditPage/index.js';
import UserPage from './Components/UserPage/index.js';

import NewStory from './Components/NewStory/index.js';
const App = () => {
  const [articles, setArticles] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  
  return (
    <>
      <Router>
        <Routes>



          <Route path="/auth/login" element={<SignIn />} />

          <Route path="/auth/register" element={<SignUp />}></Route>
          <Route path='/' element={<HomePage user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}></Route>
          <Route path='/new-story' element={<NewStory />}></Route>
          <Route path="/:username" element={<UserPage user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}></Route>
          <Route path="/:author/:blogTitle" element={<BlogPage />}>  </Route>


          <Route path="/edit-story/:blogId" element={<EditPage />}></Route>
        </Routes>
      </Router>

    </>
  );
};

export default App;