import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginModalOpen } from '../redux/slices/authSlice';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, UserRound, MessageSquareText, Reply, Heart } from "lucide-react";

const dummyBlogs = [
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "This is a blog about how crypto is transforming the future. This dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsnThis dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsnThis dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsn...",
    author: "bitcoinowner@blog.com",
    createdAt: "2025-06-06T10:00:00Z",
    tags:['crypto'],
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
    likes: 245
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
];


const BlogVisit = () => {
  const { id } = useParams();
  const blog = dummyBlogs.find(blog => blog._id === id);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  if (!blog) return <div className="text-center mt-20 text-lg font-medium text-gray-600">Blog not found. Please check the URL.</div>;

  const dummyComments = [
    { id: "c1", author: "Priya Sharma", text: "Great insights on crypto! Loved reading this.", date: "July 12, 2025" },
    { id: "c2", author: "Rajesh Kumar", text: "Very helpful for beginners. Thanks for sharing!", date: "July 10, 2025" },
  ];

  const handleLikeClick = () => {
    if (!isLoggedIn) {
      console.log("User not logged in, opening login modal.");
      dispatch(openLoginModal());
    } else {
      console.log(`User is logged in, liking blog: ${blog.title}`);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      console.log("Cannot submit comment, user not logged in. Opening login modal.");
      dispatch(openLoginModal());
    } else {
      console.log("User is logged in. Submitting comment...");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-5">
      <div className="max-w-4xl mx-auto pb-8">

        <div className='text-center p-6 sm:p-8 space-y-3 border-b border-gray-100'>
          <p className="text-xs font-semibold text-orange-600 tracking-wide uppercase">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>
          <p className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-flex items-center gap-1 w-fit mx-auto">
            <UserRound className="h-3.5 w-3.5" /> By {blog.authorName || blog.author || "Unknown"}
          </p>
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-w-4xl h-auto max-h-[50vh] object-cover"
        />

        <div className='p-6 sm:p-8'>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{blog.description}</p>
        </div>

        <div className="p-6 sm:p-8 pt-0 flex justify-end">
            <button
              onClick={handleLikeClick}
              className="flex items-center text-gray-600 hover:text-red-500 transition duration-200 p-2 rounded-md hover:bg-gray-50"
              aria-label={`Like this blog. Current likes: ${blog.likes || 0}`}
            >
              <Heart className="w-6 h-6" />
              <span className="ml-2 text-lg font-semibold">{blog.likes || 0}</span>
            </button>
        </div>

        <div className="p-6 sm:p-8 pt-0">
            <h2 className="text-xl font-bold text-gray-800 tracking-wide mb-6 flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-gray-600" /> Comments ({dummyComments.length})
            </h2>

            {dummyComments.length > 0 && (
                <div className="mt-8 space-y-6">
                    {dummyComments.map(comment => (
                        <div key={comment.id} className="border-b pb-4 border-gray-100 last:border-b-0 last:pb-0">
                            <p className="font-semibold text-gray-800">{comment.author}</p>
                            <p className="text-sm text-gray-600 mb-2">{comment.text}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{comment.date}</span>
                                <Button variant="link" className="text-blue-500 hover:text-blue-600 p-0 h-auto">
                                    <Reply className="h-3.5 w-3.5 mr-1" /> Reply
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isLoggedIn ? (
              <Card className="shadow-sm border-gray-200 mt-8">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-800">Add your comment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <Input
                          type="text"
                          placeholder="Your name"
                          className="w-full sm:w-2/3"
                      />
                      <textarea
                          placeholder='Write your comment here'
                          className='w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y min-h-[100px]'
                          rows={5}
                      />
                      <Button
                          onClick={handleCommentSubmit}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
                      >
                          Submit
                      </Button>
                  </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm border-gray-200 mt-8 text-center p-6">
                <CardTitle className="text-lg font-semibold text-gray-800 mb-3">
                  Please Log In to Leave a Comment!
                </CardTitle>
                <p className="text-gray-600 mb-4">Join the discussion by signing in or creating an account.</p>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => dispatch(openLoginModal())}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => dispatch(openLoginModal())}
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    Sign Up
                  </Button>
                </div>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default BlogVisit;