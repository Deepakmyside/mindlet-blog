import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setLoginModalOpen } from '../redux/slices/authSlice';
import { useToast } from "@/hooks/use-toast";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { toast } = useToast();

  if (!isLoggedIn) {
    dispatch(setLoginModalOpen(true));
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
   
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRoute;