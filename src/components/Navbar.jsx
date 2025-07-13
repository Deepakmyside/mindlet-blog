import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { Button } from "@/components/ui/button" // ShadCN Button



        
const Navbar = () => {
  const location = useLocation()
        const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
         

      /*  dummy login state*/
        const [isLoggedIn, setIsLoggedIn] = useState(true); // or false if testing
const navigate = useNavigate();

const handleLogout = () => {
  setIsLoggedIn(false); // later clear token/localStorage too
};


  return (
        



  <nav className="fixed top-0 left-0 w-full bg-[rgb(255,107,0)] shadow-sm z-50 px-6 py-3 flex justify-between items-center">
  {/* LEFT - LOGO */}
  <Link to="/" className="text-xl font-bold text-white tracking-tight">
    Mindlet blogs
  </Link>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-4">
    {isLoggedIn ? (
      // 👉 Logged In: Show Dropdown Only
      
      <Link to="/Admin" className="text-white font-medium hover:scale-105">
        Admin 
      </Link>
    ) : (
      // 👤 Not Logged In
      <>
        {isAuthPage ? (
          <Link to="/" className="text-white hover:underline">Home</Link>
        ) : (
          <>
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/signup" className="text-white hover:underline">Signup</Link>
          </>
        )}
      </>
    )}
  </div>
</nav>

  )
}

export default Navbar;
