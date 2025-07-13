import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const dummyBlogs = [
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "Short blog about crypto...",
    author: "me@mindlet.com",
    createdAt: "2025-06-06T10:00:00Z",
    tags: ['crypto'],
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg"
  },
  {
    _id: "2",
    title: "Startup Trends",
    description: "About startups...",
    author: "otheruser@site.com",
    createdAt: "2025-06-10T10:00:00Z",
    tags: ['startup'],
    image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg"
  }
];

const MyBlogs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 tracking-tight text-center">
  📚 My Blogs
</h1>


      {dummyBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet.</p>
      ) : (
        <div className="space-y-6">
          {dummyBlogs.map(blog => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row gap-4">
              <img src={blog.image} alt={blog.title} className="w-full sm:w-40 h-32 object-cover rounded-md" />
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{blog.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">{new Date(blog.createdAt).toDateString()}</p>
                  <p className="text-sm text-gray-500">{blog.description.slice(0, 60)}...</p>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs">
                    {blog.tags?.map(tag => (
                      <span key={tag} className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  <Button variant="outline" className="text-orange-600 border-orange-500 hover:bg-red-100 ">Visit</Button>
                  <Button variant="outline" className="text-orange-600 border-orange-500 hover:bg-red-100 ">Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
