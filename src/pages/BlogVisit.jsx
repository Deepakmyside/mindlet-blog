import API from "../api/axios";
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserRound, MessageSquareText } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import { setLoginModalOpen } from '../redux/slices/authSlice';

// 🔓 Utility to decode JWT
const decodeToken = (token) => {
  try {
    const base64Payload = token?.split('.')[1];
    return JSON.parse(atob(base64Payload));
  } catch (err) {
    return null;
  }
};

const BlogVisit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.userToken) || localStorage.getItem('userToken');
  const decoded = decodeToken(token);
  const loggedInUserId = decoded?.userId;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setBlog(res.data.blog);
        setLikeCount(res.data.blog.likes?.length || 0);
        setComments(res.data.blog.comments || []);
      } catch (err) {
        console.error('Fetch blog failed:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      dispatch(setLoginModalOpen(true));
      return;
    }

    try {
      const res = await API.put(
        `/api/blogs/${blog._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(res.data?.liked ?? false);
      setLikeCount(res.data?.likes ?? 0);
    } catch (err) {
      console.error('Like error:', err.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(setLoginModalOpen(true));
      return;
    }

    try {
      const res = await API.post(
        `/api/blogs/${blog._id}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [...prev, res.data.comment]);
      setNewComment('');
    } catch (err) {
      console.error('Comment error:', err.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/api/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Blog deleted successfully!');
      navigate('/my-blogs');
    } catch (err) {
      alert('Failed to delete blog.');
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading blog...</div>;
  if (!blog) return <div className="text-center mt-20 text-red-500">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-5">
      <div className="max-w-4xl mx-auto pb-8">
        {/* 🔖 Blog Header */}
        <div className="text-center border-b border-gray-100 p-6 sm:p-8 space-y-3">
          <p className="text-xs font-semibold text-orange-600 tracking-wide uppercase">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{blog.title}</h1>
          <p className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-flex items-center gap-1 mx-auto w-fit">
            <UserRound className="h-4 w-4" />
             By {blog.authorName || "Unknown"}
          </p>
        </div>

        {/* 🖼️ Image */}
        <img
          src={blog.imageUrl || 'https://placehold.co/800x400?text=No+Image'}
          alt={blog.title}
          className="w-full max-w-4xl h-auto max-h-[50vh] object-cover mb-6"
        />

        {/* 📜 Description */}
        <div className="px-6 sm:px-8">
          <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{blog.description}</p>
        </div>

        {/* ❤️ Like */}
        <div className="px-6 sm:px-8 pt-6 flex justify-end items-center gap-2">
          <LikeButton liked={liked} onClick={handleLikeClick} />
          <span className="text-sm font-semibold text-gray-600">{likeCount}</span>
        </div>

        {/* 🗑️ Delete (if owner) */}
        {isLoggedIn && blog.author?.toString() === loggedInUserId && (
          <div className="px-6 sm:px-8 pt-6 text-right">
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
              Delete Blog
            </Button>
          </div>
        )}

        {/* 💬 Comments */}
        <div className="px-6 sm:px-8 pt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-gray-600" />
            {`Comments (${comments.length})`}
          </h2>

          {isLoggedIn ? (
            <Card className="shadow-sm border-gray-200 mt-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800">Add your comment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
                />
                <Button
                  onClick={handleCommentSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Submit
                </Button>

                {comments.length > 0 && (
                  <div className="mt-8 space-y-6">
                    {comments.map((comment, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4">
                        <p className="font-semibold text-gray-800">
                          {comment.name || 'Anonymous'}
                        </p>
                        <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                        <span className="text-xs text-gray-400 block mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border-gray-200 mt-8 text-center p-6">
              <CardTitle className="text-lg font-semibold text-gray-800 mb-3">
                Please Log In to Leave a Comment!
              </CardTitle>
              <p className="text-gray-600 mb-4">Join the discussion by signing in or creating an account.</p>
              <div className="flex justify-center gap-4">
                <Link to="/login">
                  <Button
                    onClick={() => dispatch(setLoginModalOpen(true))}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    onClick={() => dispatch(setLoginModalOpen(true))}
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogVisit;
