import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquareText, CalendarDays, UserRound } from 'lucide-react';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { setLoginModalOpen } from '../redux/slices/authSlice'; 

const BlogCard = ({ blog }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const dispatch = useDispatch();

  const handleLikeClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!isLoggedIn) {
      console.log("User not logged in, opening login modal from BlogCard.");
      dispatch(openLoginModal()); 
    } else {
      // TODO: Backend API call to toggle like for this blog
      console.log(`User is logged in, liking blog: ${blog.title}`);
      // Yahan aap like count update karne ka logic bhi add kar sakte hain
    }
  };

  return (
    <Link to={`/blog/${blog._id}`} className="block">
      <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-full flex flex-col">
        {blog.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="p-4 pb-2 flex-grow">
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
            {blog.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <UserRound className="h-4 w-4" /> {blog.authorName || blog.author || "Unknown"}
          </CardDescription>
          <CardDescription className="text-sm text-gray-600 flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {new Date(blog.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-gray-700 line-clamp-3">
            {blog.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLikeClick}
              className="flex items-center text-gray-600 hover:text-red-500 transition duration-200"
              aria-label={`Like this blog. Current likes: ${blog.likes || 0}`}
            >
              <Heart className="w-5 h-5" />
              <span className="ml-1 text-sm">{blog.likes || 0}</span>
            </button>
            <div className="flex items-center text-gray-600">
              <MessageSquareText className="w-5 h-5" />
              <span className="ml-1 text-sm">{blog.commentsCount || 0}</span> {/* Assuming commentsCount exists */}
            </div>
          </div>
          <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600">
            Read More
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;