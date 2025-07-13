import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BlogCard from "@/components/BlogCard";
import Footer from '../components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const dummyBlogs = [
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "This is a blog about crypto...",
    author: "bitcoinowner@blog.com",
    createdAt: "2025-06-06T10:00:00Z",
    tags: ['crypto'],
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg"
  },
  {
    _id: "2",
    title: "Meditation Benefits",
    description: "Meditation can help with peace...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags: ["health"],
    image: "https://images.pexels.com/photos/6648545/pexels-photo-6648545.jpeg"
  },
  {
    _id: "3",
    title: "Bhakti",
    description: "Bhakti is the ultimate key to achieve happiness satisfaction in life...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags: ["bhakti"],
    image: "https://images.pexels.com/photos/32924881/pexels-photo-32924881.jpeg"
  },
  {
    _id: "4",
    title: "Startup Culture",
    description: "The startup culture is evolving rapidly, with new trends emerging every day...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags: ["startup"],
    image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg"
  },
  {
    _id: "5",
    title: "Finance",
    description: "Finance is the backbone of any economy, driving growth and innovation...",
    createdAt: "2025-07-05T10:00:00Z",
    tags: ["finance"],
    image: "https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg"
  },
  {
    _id: "6",
    title: "Dance",
    description: "Dance is a form of expression that transcends boundaries and cultures...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags: ["health"],
    image: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg"
  },
  {
    _id: "7",
    title: "Startup Culture",
    description: "India is the new startup hub of the world, with a vibrant ecosystem...",
    author: "startupindian@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags: ["startup"],
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg"
  }
];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    setBlogs(dummyBlogs);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag === "all" ? true : blog.tags?.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
    <div className="min-h-screen bg-[#fffdf6] flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-8 mt-[100px] px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
            Welcome to <span className="text-[rgb(255,107,0)] ">Mindlet</span> Blogs
          </h1>
          <p className="text-md md:text-lg text-gray-600 italic font-medium">
            "Every blog you write is a mirror of your growth — a step forward in the journey of self-expression, courage, and clarity."
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-10 px-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blog titles..."
            className="max-w-md"
          />
          <Button className="bg-[rgb(255,107,0)] hover:bg-orange-600 text-white">Search</Button>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-6 px-4">
          {["all", "finance", "crypto", "startup", "health", "technologia", "bhakti"].map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeTag === tag ? 'bg-[rgb(255,107,0)] text-white' : 'bg-gray-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto px-4">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        <div className="mt-20 mb-10 max-w-2xl mx-auto text-center bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Never miss a news</h2>
          <p className="text-gray-500 mb-6">Subscribe to our newsletter to get latest blog updates</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Input type="email" placeholder="Enter your email" className="w-full sm:w-2/3" />
            <Button className="text-white bg-orange-500 hover:bg-orange-600">Subscribe</Button>
          </div>
        </div>
      </main>

      <Footer />
        </div>
      
       </>
  );
};

export default Home;
