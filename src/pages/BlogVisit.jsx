import React from 'react';
import { useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, UserRound, MessageSquareText, Reply } from "lucide-react";

const dummyBlogs = [
  // ... (dummyBlogs array remains the same as previous code)
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "This is a blog about how crypto is transforming the future. This dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsnThis dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsnThis dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsn...",
    author: "bitcoinowner@blog.com",
    createdAt: "2025-06-06T10:00:00Z",
    tags:['crypto'],
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg"
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
    _id: "3",
    title: "Bhakti",
    description: "Bhakti is the ultimate key to achieve happiness satisfaction in life...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["bhakti"],
    image: "https://images.pexels.com/photos/32924881/pexels-photo-32924881.jpeg"
  },
  {
    _id: "4",
    title: "Startup Culture",
    description: "The startup culture is evolving rapidly, with new trends emerging every day...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["startup"],
    image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg"
  },
  {
    _id: "5",
    title: "Finance",
    description: "Finance is the backbone of any economy, driving growth and innovation...",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["finance"],
    image: "https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg"
  },
  {
    _id: "6",
    title: "Dance",
    description: "Dance is a form of expression that transcends boundaries and cultures...",
    author: "healthguide@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["health"],
    image: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg"
  },
  {
    _id: "7",
    title: "Startup Culture",
    description: "India is the new startup hub of the world, with a vibrant ecosystem...",
    author: "startupindian@blog.com",
    createdAt: "2025-07-05T10:00:00Z",
    tags:["startup"],
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg"
  }
];


const BlogVisit = () => {
  const { id } = useParams();
  const blog = dummyBlogs.find(blog => blog._id === id);

  if (!blog) return <div className="text-center mt-20 text-lg font-medium text-gray-600">Blog not found. Please check the URL.</div>;

  const dummyComments = [
    { id: "c1", author: "Priya Sharma", text: "Great insights on crypto! Loved reading this.", date: "July 12, 2025" },
    { id: "c2", author: "Rajesh Kumar", text: "Very helpful for beginners. Thanks for sharing!", date: "July 10, 2025" },
  ];

  return (
    // Changed bg-[#fffdf6] to bg-white for a completely white page background
    <div className="min-h-screen bg-white py-10 px-5"> 
      {/* Removed bg-white, shadow-lg, rounded-lg, overflow-hidden from this div.
          Kept max-w-4xl mx-auto pb-8 for centered content with specific width. */}
      <div className="max-w-4xl mx-auto pb-8"> 
        
        {/* Blog Header Section */}
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

        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-w-4xl h-auto max-h-[50vh] object-cover" 
        />

        {/* Blog Description/Content */}
        <div className='p-6 sm:p-8'>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{blog.description}</p>
        </div>
        
        {/* Comments Section */}
        <div className="p-6 sm:p-8 pt-0">
            <h2 className="text-xl font-bold text-gray-800 tracking-wide mb-6 flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-gray-600" /> Comments ({dummyComments.length})
            </h2>

            {/* List of Existing Comments */}
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
                            {/* Placeholder for Reply Form (will appear on click) */}
                            {/* You'd manage state to show/hide this for a real reply feature */}
                            {/* <div className="mt-4 pl-6 border-l border-gray-200">
                                <Input placeholder="Your reply..." />
                                <Button className="mt-2 text-xs">Submit Reply</Button>
                            </div> */}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Your Comment Card */}
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
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
                    >
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogVisit;