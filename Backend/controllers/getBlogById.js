const Blog = require("../models/Blog");

const getBlogById = async (req, res) => {
  try {

    console.log("REQ PARAM ID:", req.params.id);
    
    const blog = await Blog.findById(req.params.id);
console.log("FOUND BLOG:", blog);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getBlogById;
