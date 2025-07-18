# 🌸 Mindlet Blog – A Socially Impactful Blogging Platform

**Mindlet Blog** is a full-stack web application built to empower users to share thoughts, stories, and ideas — with a special focus on accessibility and inclusivity. Designed with modern UI and robust backend, it supports blog creation and management, AI-powered content generation, likes, comments, and user authentication.

Have a look please!
---

## 🚀 Live Demo

🔗 [Visit the Live Site](https://mind-let-blog.netlify.app)

---

## 🧠 Tech Stack

| Layer       | Technology               |
|-------------|--------------------------|
| Frontend    | React, Vite, Shadcn/ui, Tailwind CSS  
| Backend     | Node.js, Express.js  
| Database    | MongoDB + Mongoose  
| Auth        | JWT (JSON Web Tokens)  
| AI Service  | Gemini Ai (or mock integration)  
| Deployment  | Netlify (Frontend), Render (Backend)  

---

## ✨ Features

### 🔐 Authentication
- User signup/login with JWT
- Protected routes for blog creation, likes, and comments

### 📝 Blog System
- Create, read, delete blogs
- Upload images via ImageKit /*(will be working very soon)*/
- Tags support with comma-separated input

### 🤖 AI Blog Generation
- Generate blog content using AI based on title and description
- Status messages and error handling included

### ❤️ Like System
- Authenticated users can like/unlike blogs
- Like count displayed dynamically

### 💬 Comment System
- Authenticated users can comment on blogs
- Users can delete their own comments /*(will add this feature soon)*/

### 🧘‍♂️ Author Attribution
- Author name displayed using decoded JWT
- Only blog owner sees delete option

---

## 📦 Folder Structure





---

## 🛠️ Setup Instructions

### 🔧 Frontend

```bash
cd client
npm install
VITE_API_BASE_URL=https://mindletblog.onrender.com/api
npm run dev

### 🔧 Backend

```bash
cd server
npm install
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
npm run start

