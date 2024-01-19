# Blog Management System

## Overview
🚀 The Blog Management System is a full-stack application developed for creating, reading, updating, and deleting articles. It provides a user-friendly platform with features like user authentication, article commenting, favorites management, full-text search, and more.

## Features

- **User Authentication:**
  - 🔐 Secure authentication for personalized access and controls.
  
- **Article Management:**
  - ✏️ CRUD operations for articles, allowing users to create, read, update, and delete articles.

- **Comment System:**
  - 💬 Interactive comment system to engage with articles.

- **Favorites Management:**
  - ⭐ Add or remove articles to/from favorites for quick access.

- **Full-Text Search:**
  - 🔍 Efficient search functionality for articles.

## Tech Stack

- **Frontend:**
  - ⚛️ React

- **Backend:**
  - 🖥️ Node.js
  - 🚀 Express

- **Database:**
  - 📊 MongoDB

## Getting Started

### Prerequisites

- 📚 Node.js and npm installed
- 📦 MongoDB installed and running

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/blog-management-system.git
   cd blog-management-system
    ```
### 1. Install dependencies


    cd client && npm install
    cd ../server && npm install
### 2.  Set up environment variables

    Create a .env file in the server directory and configure MongoDB connection, JWT_SECRET, etc.
### 3. Run the application


  #### In the server directory
    npm run dev

  #### In the client directory
    npm start

## Folder Structure
    blog-management-system/
    |-- client/
    |   |-- src/
    |   |   |-- assets/
    |   |   |-- Components/
    |   |   |   |-- ArticlesGroupComponent/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- ArticlesInfo/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- BlogPage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- BlogPageActions/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- BlogPost/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- BodyPage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- Comment/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- CommentForm/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- Comments/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- EditPage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- Header/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- HomePage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- NavBar/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- NavBarArttclesInfo/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- NewStory/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- Promotion/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- RecentSearches/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- SignInPage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- SignUpPage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- UserPage/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- UserPageFavorites/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   |   |-- UserPageHome/
    |   |   |   |   |-- index.js
    |   |   |   |   |-- index.css
    |   |   |   |
    |   |   | -- constants/
    |   |   |   | -- userFieldsFunction.js
    |
    |-- server/
    |   |-- src/
    |   |   |-- config/
    |   |   |   |-- dbConnection.js
    |   |   |
    |   |   |-- controllers/
    |   |   |   |-- articleController.js
    |   |   |   |-- commentController.js
    |   |   |   |-- userController.js
    |   |   |   |-- userFieldsController.js
    |   |   |
    |   |   |-- middlewares/
    |   |   |   |-- errorHandler.js
    |   |   |   |-- validTokenHandler.js
    |   |   |
    |   |   |-- models/
    |   |   |   |-- articleModel.js
    |   |   |   |-- commentModel.js
    |   |   |   |-- userFieldModel.js
    |   |   |   |-- userModel.js
    |   |   |
    |   |   |-- routers/
    |   |   |   |-- accountRouter.js
    |   |   |   |-- articleRouter.js
    |   |   |   |-- userFieldsRouter.js
    |   |   |
    |   |   |-- constants.js
    |   |   |-- server.js
    |   |   |-- .env
    |-- README.md

# Screenshots of this project

## Home Page
![Screenshot 2024-01-18 171247](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/de3b3396-4f60-4f30-845d-1600439e2dba)

## Sign Up Page
![Screenshot 2024-01-18 171338](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/b7a11bba-a52d-4a57-a063-f70026360620)

## Sign In Page
![Screenshot 2024-01-18 171323](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/278a0413-5b7c-4c36-acb4-25ecb2410255)

## Adding Blog
![Screenshot 2024-01-18 171855](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/0dd476b0-2ff4-4cf3-a9f4-0b0c24af857f)

## Editing Blog
![Screenshot 2024-01-18 171913](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/3becd719-f363-446a-8ef5-5e9bb5a2b0c1)

## Full Text Search
![Screenshot 2024-01-18 171734](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/99c7b38a-18b6-4b59-ad09-bb9c4a5a1edd)

## when blog is clicked the data will be displayed
![Screenshot 2024-01-18 171526](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/91528287-4400-444c-9050-6ad6dc080da9)

## Time taken to read creation date 
![Screenshot 2024-01-18 171941](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/520947cc-14e1-4165-b85d-e6c425cf3d28)

## Clapping
### Before Clapping 
![Screenshot 2024-01-18 172106](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/e5c0cb19-4bc8-4793-b275-731eddf34f0d)

## After Clapping
![Screenshot 2024-01-18 172121](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/0683685e-f0b1-438e-8a20-6070b5e18bf6)


## Add to Favorites Icon

### Before Adding
![Screenshot 2024-01-18 171706](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/435d90f6-875b-4683-af20-6594bc2eba0d)

### After Adding
![Screenshot 2024-01-18 171643](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/5413f58e-a861-4d73-8bf7-98ea1326ede2)

## Editing Comment
![Screenshot 2024-01-18 171611](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/2e605b04-315d-441f-a79c-f01234b9b5d5)

## Replying Comment

![Screenshot 2024-01-18 172141](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/0d3cd01d-2ba9-4a16-ac86-8ea91032133e)

## User Page
![Screenshot 2024-01-18 171831](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/6bc65ca9-a948-4ea5-9795-0212859450d3)

## User Favorite Blogs
![Screenshot 2024-01-18 171841](https://github.com/kvprasad13/Blog-Management-System/assets/123655329/90ffd50d-9cfd-4a1a-baa3-098e984548be)

# Author
Varaprasad Kade


