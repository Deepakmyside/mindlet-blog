import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import { LogIn, UserPlus, Home as HomeIcon, Settings, LogOut } from 'lucide-react';

// Make sure this exists in your authSlice.js
import { logout } from '@/redux/slices/authSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.auth.userToken);
  const isLoggedIn = !!userToken;

  const isOnAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const adminRoutes = ['/admin', '/myblogs', '/add'];
  const isOnAdminSection = adminRoutes.includes(location.pathname);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[rgb(255,107,0)] shadow-sm z-50 px-6 py-3 flex justify-between items-center">
      {/* LEFT - LOGO */}
      <Link to="/" className="text-xl font-bold text-white tracking-tight">
        Mindlet blogs
      </Link>

      {/* RIGHT SIDE - Conditional Rendering */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {isOnAdminSection ? (
              <Button asChild variant="ghost" className="text-white hover:bg-orange-600 flex items-center gap-2">
                <Link to="/"> <HomeIcon className="h-4 w-4" /> Home </Link>
              </Button>
            ) : (
              <Button asChild variant="ghost" className="text-white hover:bg-orange-600 flex items-center gap-2">
                <Link to="/admin"> <Settings className="h-4 w-4" /> Admin </Link>
              </Button>
            )}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-orange-600 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </>
        ) : (
          <>
            {isOnAuthPage ? (
              <Button asChild variant="ghost" className="text-white hover:bg-orange-600 flex items-center gap-2">
                <Link to="/"> <HomeIcon className="h-4 w-4" /> Home </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-[rgb(255,107,0)] flex items-center gap-2">
                  <Link to="/login"> <LogIn className="h-4 w-4" /> Login </Link>
                </Button>
                <Button asChild variant="default" className="bg-white text-[rgb(255,107,0)] hover:bg-gray-100 flex items-center gap-2">
                  <Link to="/signup"> <UserPlus className="h-4 w-4" /> Signup </Link>
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
