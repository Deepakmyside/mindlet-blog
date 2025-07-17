import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BlogCard from "@/components/BlogCard";
import Footer from '../components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag === "All" ? true : blog.tags?.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data.blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#fffdf6] flex flex-col">
        <Navbar />

        <main className="flex-grow">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto px-4 mt-28 mb-16">
            <p className="text-sm font-semibold text-purple-600 mb-4 tracking-wide">
              Powered with Generative AI ✨
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              Welcome to <span className="text-[rgb(255,107,0)]">Mindlet</span> Blogs
            </h1>

            <p className="text-lg md:text-xl text-gray-600 italic font-medium leading-relaxed max-w-2xl mx-auto">
              “Every blog you write is a mirror of your growth — a step forward in the journey of self-expression, courage, and clarity.”
            </p>
          </div>

          {/* Search Bar */}
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

          {/* Tag Filters */}
          <div className="flex gap-2 flex-wrap justify-center mb-10 px-4">
            {["All", "Finance", "Health", "Technology", "Education", "Travel", "Bhakti", "Food"].map(tag => (
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

          {/* Blog Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto px-4">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 mb-10 max-w-2xl mx-auto text-center bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Never miss a news</h2>
            <p className="text-gray-500 mb-6">Subscribe to our newsletter to get latest blog updates</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Input type="email" placeholder="Enter your email" className="w-full sm:w-2/3" />
              <Button className="text-white bg-orange-500 hover:bg-orange-600">Subscribe</Button>
            </div>
          </div>

          {/* Animated About Us Link */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10 mb-14"
          >
            <Link
              to="/about"
              className="bg-orange-50 hover:bg-orange-100 border border-orange-300 px-6 py-3 rounded-full shadow-md text-orange-600 font-semibold tracking-wide transition duration-300 hover:shadow-lg hover:scale-105"
            >
              🚀 Meet the Team Behind Mindlet
            </Link>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
