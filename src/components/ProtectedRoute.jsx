import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setLoginModalOpen } from '../redux/slices/authSlice';
import { useToast } from "@/components/ui/use-toast";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { toast } = useToast();

  if (!isLoggedIn) {
    dispatch(openLoginModal());
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
    return <div className="text-center mt-20 text-lg font-medium text-gray-600">Redirecting to login...</div>;
  }

  return children;
};

export default ProtectedRoute;