import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Components/Header.js';
// import articles from './Data/ArticlesData.js';
import SignIn from './SignInPage.js';
import SignUp from './SignUpPage.js';
import HomePage from '../Components/HomePage.js';
import ArticlePage from './ArticlePage.js';
import PostPage from '../Components/PostPage1.js';
const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path='/articlePage/:articleId' element={<ArticlePage />}>  </Route>

          <Route path="/PostPage" element={<PostPage />}></Route>
        </Routes>
      </Router>

    </>
  );
};

export default App;