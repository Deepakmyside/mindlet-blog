import React from 'react'
import Layout from "./components/Layout";
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup';
import BlogCard from './components/BlogCard';
const App = () => {
  return (
    
     <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      </Layout>
      
    </div>
    
  )
}

export default App
