import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)} // ✅ This adds the navigation
      className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300 overflow-hidden"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{new Date(blog.createdAt).toDateString()}</p>
        <p className="text-gray-700 text-sm">{blog.description.slice(0, 100)}...</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {blog.tags?.map(tag => (
            <span key={tag} className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
