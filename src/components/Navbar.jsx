import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button" // ShadCN Button



        
const Navbar = () => {
  const location = useLocation()
        const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  return (
        





   <nav className="fixed top-0 left-0 w-full bg-[rgb(255,107,0)] shadow-sm z-50 px-6 py-3 flex justify-between items-center blur-background-md  transition-all duration-300">
      {/* LEFT SIDE - LOGO */}
      <Link to="/" className="text-xl font-bold text-white tracking-tight">
        Mindlet
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {isAuthPage ? (
          <Link to="/" className="text-white text-base hover:scale-105 transition-transform duration-150">
            Home
          </Link>
        ) : (
          <>
            <Link to="/login" className="text-white text-base hover:scale-105 transition-transform duration-150">
              Login
            </Link>
            <Link to="/signup" className="text-white text-base hover:scale-105 transition-transform duration-150">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
