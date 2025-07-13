import React from 'react'
import { useParams } from 'react-router-dom'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 const dummyBlogs = [
  {
    _id: "1",
    title: "Crypto is Booming",
    description: "This is a blog about how crypto is transforming the future This dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsnThis dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsnThis dskfh sdkf kds nkfsdkfd gefng;sflkdgkfld g;sfdbefglksfd giesfdsgkfndj gfns.dgjfndgjksfndg.lesfkndgifd gnjesfd gjkasfn;dg esfngjksfjlkgnfdkgnsfxjkgnesfndg;ouesrgourje zgero;gerug horegrefgi e rgkj fjgksfndgjkf ndkjg fndkdsfwgfsdgefgkdrxngjsfdgsfndgknfsdjgsjrdfngjkcxkvsfxkcgnkdngxjkcxlvhfdybhsjkdnhvkizsjvkgfnh gmjfn,s v ej ghlas gkjashdgosfjkdnfjkvgansdlkvndslkbn/jfldcnbvjkfdbknsjnbzsn...",
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
    const { id } = useParams();  // get ID from URL
    const blog = dummyBlogs.find(blog => blog._id === id); //Find that blog
    
    if (!blog) return <div className="text-center mt-20">Blog not found</div>;

   return (
    <div className="min-h-screen bg-[#fffdf6] py-10 px-5">

    <div className="max-w-3xl mx-auto px-4 py-8 ">
       
      <div className='text-center mb-6 space-y-6'> 
        
        <p className="text-xs font-semibold text-[rgb(255,107,0)] tracking-wide uppercase mb-5">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">{blog.title}</h1>
        
          <p className="text-sm font-semibold text-orange-500 bg-[rgb(255,211,179)] px-3 py-0.5 rounded-full inline-block mb-2 w-fit">By {blog.authorName || "Unknown"}</p>

      </div>

      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-t-md mb-5 " />

      <div className='  px-5 py-10'>
        <p className="text-black leading-relaxed whitespace-pre-line mb-5  break-words ">{blog.description}</p>
      </div>
      
      <h1 className="text-lg font-semibold text-black tracking-wide  mb-6 ">
            Comments(2)
        </h1>

        
          <div className="mt-12 space-y-3" >
            
            <h1 className="text-lg font-semibold   text-black tracking-wide   ">
                Add your comment
             </h1>

            <div className='space-y-6'>
             <Input
                type="text"
                placeholder="Your name"
                className="w-full sm:w-2/3 border-gray-300" />

              <textarea
              placeholder='Write your comment here'
              className='w-full sm:w-2/3 border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 '
              rows={10}
             />
                  <div>
                    <button
                        className=" w-fit sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 mt rounded-lg transition" >
                          Submit
                        </button>
                 </div>
                
            </div>
              {/* Like Button (Optional) */}
               {/* <BlogLike /> */}
          </div>
      </div>
    </div>
  );
};

export default BlogVisit;
