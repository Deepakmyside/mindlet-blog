import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import { LogIn, UserPlus, Home as HomeIcon, Settings, LogOut } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 w-full bg-[rgb(255,107,0)] shadow-sm z-50 px-4 py-3 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold text-white tracking-tight">
        Mindlet blogs
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            {isOnAdminSection ? (
              <Link to="/">
                <Button variant="ghost" className="text-white hover:bg-white/10 px-3 py-2 text-sm">
                  <HomeIcon className="h-4 w-4 mr-1" /> Home
                </Button>
              </Link>
            ) : (
              <Link to="/admin">
                <Button variant="ghost" className="text-white hover:bg-white/10 px-3 py-2 text-sm">
                  <Settings className="h-4 w-4 mr-1" /> Admin
                </Button>
              </Link>
            )}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/10 px-3 py-2 text-sm"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </>
        ) : (
          <>
            {isOnAuthPage ? (
              <Link to="/">
                <Button variant="ghost" className="text-white hover:bg-white/10 px-3 py-2 text-sm">
                  <HomeIcon className="h-4 w-4 mr-1" /> Home
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10 px-3 py-2 text-sm">
                    <LogIn className="h-4 w-4 mr-1" /> Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="ghost" className="text-white hover:bg-white/10 px-3 py-2 text-sm">
                    <UserPlus className="h-4 w-4 mr-1" /> Signup
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
