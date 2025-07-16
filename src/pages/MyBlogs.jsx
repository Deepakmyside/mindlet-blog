import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ExternalLink } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching your blogs:", error.message);
      }
    };

    fetchMyBlogs();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📚 My Blogs</h1>

      {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
        <div className="space-y-4">
          {myBlogs.map((blog) => (
            <Card
              key={blog._id}
              className="p-4 flex flex-col sm:flex-row gap-4 items-start justify-between hover:shadow-md transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full sm:w-28 h-24 object-cover rounded-md"
              />

              <div className="flex flex-col flex-grow w-full justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(blog.createdAt).toDateString()}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">{blog.description}</p>
                </div>

                <div className="flex gap-3 mt-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="flex items-center gap-1 text-blue-600 border-blue-500 hover:bg-blue-50"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You haven’t published any blogs yet ✍️
        </p>
      )}
    </div>
  );
};

export default MyBlogs;
