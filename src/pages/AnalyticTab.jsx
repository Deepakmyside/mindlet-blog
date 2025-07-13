import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
const dummyBlogs = [
  { title: "Crypto", likes: 12, comments: 4 },
  { title: "Meditation", likes: 8, comments: 2 },
  { title: "Bhakti", likes: 15, comments: 6 },
  { title: "Startup", likes: 6, comments: 1 },
];

const AnalyticsTab = () => {
  // Calculate total stats
  const totalBlogs = dummyBlogs.length;
  const totalLikes = dummyBlogs.reduce((sum, blog) => sum + blog.likes, 0);
  const totalComments = dummyBlogs.reduce((sum, blog) => sum + blog.comments, 0);

  return (
    <div className="space-y-6 pt-10  ">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-[rgb(255,107,0)]">Total Blogs</h2>
          <p className="text-3xl font-bold text-gray-800">{totalBlogs}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-[rgb(255,107,0)] ">Total Likes</h2>
          <p className="text-3xl font-bold text-gray-800">{totalLikes}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-[rgb(255,107,0)]">Total Comments</h2>
          <p className="text-3xl font-bold text-gray-800">{totalComments}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow ">
        <div className="text-2xl font-bold text-[rgb(255,107,0)]  mb-7"><h1>Wondering which Blog is growing? Here we go:</h1></div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Likes</h3>
        <ResponsiveContainer width="70%"  height={300}>
          <BarChart data={dummyBlogs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="likes" fill="#FF6B00" />
          </BarChart>
        </ResponsiveContainer>
                <h3 className="text-lg font-semibold text-gray-700   text-center"> Category</h3>
      </div>
    </div>
  );
};

export default AnalyticsTab;