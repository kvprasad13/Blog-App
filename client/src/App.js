import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Components/Header.js';
// import articles from './Data/ArticlesData.js';
import SignIn from './Components/SignInPage.js';
import SignUp from './Components/SignUpPage.js';
import HomePage from './Components/HomePage.js';
import ArticlePage from './Components/ArticlePage.js';
import PostPage from './Components/PostPage.js';
import EditPage from './Components/EditPage.js';
const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path='/articlePage/:articleId' element={<ArticlePage />}>  </Route>

          <Route path="/post" element={<PostPage />}></Route>
          <Route path = "/edit/:articleId" element={<EditPage />}></Route>
        </Routes>
      </Router>

    </>
  );
};

export default App;