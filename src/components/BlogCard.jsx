// src/components/BlogCard.jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from 'react';
import { useNavigate } from "react-router-dom";


const BlogCard = ({ blog }) => {
  const navigate = useNavigate();


  return (

    <Card
    onClick={() => navigate(`/blog/${blog._id}`)}
      role="article"
      className="min-h-[350px] w-full bg-gray-50 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1  hover:cursor-pointer transition-all duration-50  ease-out flex flex-col"
    >
      <CardHeader className="p-0">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-48 object-cover rounded-t-xl hover:opacity-90 transition"
        />
        

      </CardHeader>
      

      <CardContent className="p-4 flex flex-col justify-between h-full">

          {blog.tags && blog.tags.length > 0 && (
          <div className="text-xs text-orange-700 bg-orange-200 px-2 py-1 rounded-full inline-block mb-2 w-fit">
            #{blog.tags[0]}
          </div>
      )}

        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
          {blog.title}
        </CardTitle>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {blog.description || "No description available."}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-200">
          <span>✍️ {blog.authorName}</span>
          <span>📅 {new Date(blog.createdAt).toDateString()}</span>
        </div>

        {/* Optional Read More link */}
        {/* <a href={`/blogs/${blog._id}`} className="text-indigo-600 text-sm hover:underline mt-2">
          Read more →
        </a> */}
      </CardContent>
    </Card>
  );
};

export default BlogCard;
