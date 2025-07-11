import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from "@/components/BlogCard"

const Blogs = [
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "This is a blog about how crypto is transforming the future... aksfhsakjdfksjdhfkjdasfksadnfkjsndkjfadsjkfdasjkfkjasdnfkjasndfkjaszfkjanjkfnsjknfdk...",
    author: "bitcoinowner@blog.com",
    createdAt: "2025-06-06T10:00:00Z",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace, clarity and healing...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "3",
    title: "Bhakti",
    description: "Bhakti is the ultimate key to achieve happiness satisfaction in life...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    image: "https://images.pexels.com/photos/32924881/pexels-photo-32924881.jpeg"
  },
  {
    _id: "4",
    title: "Startup Culture",
    description: "The startup culture is evolving rapidly, with new trends emerging every day...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg"
  },
  {
    _id: "5",
    title: "Finance",
    description: "Finance is the backbone of any economy, driving growth and innovation...",
    createdAt: "2025-07-05T10:00:00Z",
    image: "https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg"
  },
  {
    _id: "6",
    title: "Dance",
    description: "Dance is a form of expression that transcends boundaries and cultures...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    image: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg"
  },
  {
    _id: "7",
    title: "Startup Culture",
    description: "India is the new startup hub of the world, with a vibrant ecosystem...",
    author: "startupindian@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fffdf6] py-10 px-5">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Welcome to <span className="text-[rgb(255,107,0)]">Mindlet</span> Blogs
        </h1>

        <p className="text-md md:text-lg text-gray-600 italic font-medium">
          "Every blog you write is a mirror of your growth — a step forward in the journey of self-expression, courage, and clarity."
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center gap-2 mb-10">
        <input
          type="text"
          placeholder="Search for blogs..."
          className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(255,107,0)]"
        />
        <button className="bg-[rgb(255,107,0)] text-white px-5 py-2 rounded-md hover:bg-[rgb(255,89,0)] transition">
          Search
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
        {Blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
