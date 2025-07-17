import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Eye, Trash2 } from 'lucide-react';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      setLoading(true);
      setError(null);

      if (!userToken) {
        toast({
          title: "Authentication Error",
          description: "Please log in to view your blogs.",
          variant: "destructive",
        });
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/blogs/myblogs', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setMyBlogs(response.data.blogs || []);
      } catch (err) {
        console.error("Error fetching my blogs:", err);
        setError(err.response?.data?.message || "Failed to fetch blogs.");
        toast({
          title: "Error",
          description: err.response?.data?.message || "Failed to fetch blogs.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [userToken, navigate, toast]);

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast({
        title: "Blog Deleted",
        description: "Your blog has been successfully deleted.",
      });

      setMyBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (err) {
      toast({
        title: "Deletion Failed",
        description: err.response?.data?.message || "Failed to delete blog.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading your blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-white p-6">
      <div className="w-full max-w-4xl mt-5">
        <h1 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-2 text-[rgb(255,107,0)]">
          
          My Blogs
        </h1>

        {myBlogs.length > 0 ? (
          <div className="space-y-6">
            <p className="text-md text-gray-500 mb-4">Total Blogs: {myBlogs.length}</p>
            {myBlogs.map((blog) => (
              <Card key={blog._id} className="flex flex-col md:flex-row items-start p-4 border border-gray-200 shadow-sm">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full md:w-44 h-28 object-cover rounded mr-4 mb-3 md:mb-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/192x128?text=No+Image"; }}
                  />
                )}

                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {blog.description.replace(/<[^>]+>/g, '')}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/blogs/${blog._id}`}>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Visit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center bg-gray-50 p-10 rounded-lg border border-dashed border-gray-300 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Blogs Yet</h2>
            <p className="text-gray-500 mb-6">You haven’t published any blogs yet.</p>
            <Link to="/add">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
                Start Writing Your First Blog
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
