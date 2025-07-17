const Blog = require("../models/Blog");

const getMyBlogs = async (req, res) => {
  const userId = req.user.id;
    console.log("REQ.USER.ID", req.user.id);
  console.log("Fetching blogs for user ID:", userId);


  try {
  
    const blogs = await Blog.find({  author: new mongoose.Types.ObjectId(req.user.id), }).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
    

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user's blogs", error: error.message });
  }
};

module.exports = {getMyBlogs} ;
