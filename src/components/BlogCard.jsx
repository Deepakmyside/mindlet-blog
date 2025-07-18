import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginModalOpen } from '../redux/slices/authSlice';
import axios from 'axios';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquareText, CalendarDays, UserRound } from 'lucide-react';
import LikeButton from "@/components/LikeButton";

const BlogCard = ({ blog }) => {
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const token = useSelector((state) => state.auth.userToken);
const dispatch = useDispatch();

const [liked, setLiked] = useState(false);
const [likeCount, setLikeCount] = useState(blog.likes?.length || 0);


  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      dispatch(setLoginModalOpen(true)); // ✅ Redux modal trigger
      return;
    }

    try {
      const response = await axios.put(
        `https://mindletblog.onrender.com/api/blogs/${blog._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLiked(response?.data?.liked ?? false);
      setLikeCount(response?.data?.likes ?? 0);
    } catch (err) {
      console.error("Like error:", err.message);
    }
  };

  
  return (
    <Link to={`/blogs/${blog._id}`} className="block">
      <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-[380px] sm:h-[420px]  lg:h-[420px] flex flex-col justify-between">
       {blog.imageUrl ? (
  <div className="relative w-full h-[250px] sm:h-[260px] md:h-[280px] lg:h-[300px] overflow-hidden ">
    <img
      src={blog.imageUrl}
      alt={blog.title}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
) : (
  <div className="w-full h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm italic text-gray-500">
    "Interesting to Read", have a look!
  </div>
)}

        <CardHeader className="p-4 pb-2 flex-grow ">
          <CardTitle className="text-xl font-bold text-gray-900 ">{blog.title}</CardTitle>
          <CardDescription className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <UserRound className="h-4 w-4" /> {blog.authorName || blog.author || "Unknown"}
          </CardDescription>
          <CardDescription className="text-sm text-gray-600 flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {new Date(blog.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-gray-700 line-clamp-2 ]">{blog.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <LikeButton liked={liked} onClick={handleLikeClick} />
            <div className="flex items-center text-gray-600">
              <MessageSquareText className="w-5 h-5" />
              <span className="ml-1 text-sm">{blog.commentsCount || 0}</span>
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
