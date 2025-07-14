import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ExternalLink } from "lucide-react";

const dummyBlogs = [
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "A short blog about the latest trends in cryptocurrency...",
    createdAt: "2025-06-06T10:00:00Z",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg"
  },
  {
    _id: "2",
    title: "Startup Trends",
    description: "Exploring developments in the startup ecosystem...",
    createdAt: "2025-06-10T10:00:00Z",
    image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg"
  }
];

const MyBlogs = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📚 My Blogs</h1>

      <div className="space-y-4">
        {dummyBlogs.map((blog) => (
          <Card
            key={blog._id}
            className="p-4 flex flex-col sm:flex-row gap-4 items-start justify-between hover:shadow-md transition rounded-md"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full sm:w-28 h-24 object-cover rounded-md"
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow w-full">
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">{new Date(blog.createdAt).toDateString()}</p>
                <p className="text-sm text-gray-700 line-clamp-2">{blog.description}</p>
              </div>

              {/* Buttons - aligned right on large, stacked on small */}
              <div className="flex gap-3 mt-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="flex items-center gap-1 text-blue-600 border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white "
                  
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
