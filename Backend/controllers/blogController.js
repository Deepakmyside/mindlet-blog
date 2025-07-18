const Blog = require('../models/Blog');
const ImageKit = require('imagekit');
const mongoose = require('mongoose');

// ❌ Removed dotenv.config() — not needed in Render
// ✅ ImageKit will be initialized inside the function

const uploadImageToImageKit = async (imageFile) => {
  // ✅ Initialize ImageKit here (deferred)
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  console.log("ImageKit ENV:", {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  try {
    const response = await imagekit.upload({
      file: imageFile.buffer,
      fileName: imageFile.originalname,
      folder: '/blog_images/',
    });
    return response.url;
  } catch (error) {
    throw new Error(`ImageKit upload failed: ${error.message}`);
  }
};

// ✅ CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadImageToImageKit(req.file);
    }

    const newBlog = new Blog({
      title,
      description,
      tags: tagsArray,
      imageUrl,
      author: req.user._id,
      authorName: req.user.name, 
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: savedBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ GET MY BLOGS
exports.getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id;

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching all blogs:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ DELETE BLOG
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user._id;

  const blog = await Blog.findById(blogId);
  if (!blog || blog.author.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized or blog not found" });
  }

  await Blog.findByIdAndDelete(blogId);
  res.status(200).json({ message: "Blog deleted successfully" });
};
