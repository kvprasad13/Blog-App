import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './Components/SignInPage/index.js';
import SignUp from './Components/SignUpPage/index.js';
import HomePage from './Components/HomePage/index.js';
import BlogPage from './Components/BlogPage/index.js';

import EditPage from './Components/EditPage/index.js';
import UserPage from './Components/UserPage/index.js';

import NewStory from './Components/NewStory/index.js';
const App = () => {
  const [articles, setArticles] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [user, setUser] = useState(undefined);
 
  
  return (
    <>
      <Router>
        <Routes>



          <Route path="/auth/login" element={<SignIn user={user} setUser={ setUser}  />} />

          <Route path="/auth/register" element={<SignUp user={user} setUser={setUser} />}></Route>
          <Route path='/' element={<HomePage user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}></Route>
          <Route path='/new-story' element={<NewStory user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}></Route>
          <Route path="/:username" element={<UserPage user={user} setUser={setUser} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}></Route>
          <Route path="/:author/:blogTitle" element={<BlogPage user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}>  </Route>


          <Route path="/edit-story/:blogId" element={<EditPage user={user} articles={articles} setArticles={setArticles} recentSearches={recentSearches} setRecentSearches={setRecentSearches} />}></Route>
        </Routes>
      </Router>

    </>
  );
};

export default App;