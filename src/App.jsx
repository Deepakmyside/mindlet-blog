import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"; // <-- Yeh line import karein
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogVisit from './pages/BlogVisit';
import Admin from "./pages/Admin";
import MyBlogs from './pages/MyBlogs';
import AddBlog from "./pages/AddBlog";
import AboutUs from "./pages/AboutUs";
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUserFromStorage } from './redux/slices/authSlice';

import ProtectedRoute from './components/ProtectedRoute';



const AppContent = () => {
  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/blogs/:id' element={<BlogVisit/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myblogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
         <Toaster /> 
      </Layout>
     {/* <-- Yeh component yahan render karein */}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      
        <AppContent />

    </Provider>
  );
};

export default App;