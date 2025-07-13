import React from 'react'
import Layout from "./components/Layout";
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup';
import BlogCard from './components/BlogCard';
import MyBlogs from './pages/MyBlogs';
import BlogVisit from './pages/BlogVisit';
import Admin from "./pages/Admin";





const App = () => {

  return (
      
     <div className="min-h-screen bg-background text-foreground">
      
      <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/blog/:id' element={<BlogVisit/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/myblogs" element={<MyBlogs />} />



      </Routes>
      </Layout>
      
    </div>
    
    
  )
}

export default App
