const Blog = require('../models/Blog');
const ImageKit = require('imagekit');
require('dotenv').config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImageToImageKit = async (imageFile) => {
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

exports.createBlog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { title, description, tags } = req.body;

    // ✅ Simple description validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Blog title is required.' });
    }

     if (!description || description.trim() === '') {
      return res.status(400).json({ message: 'Blog content (description) cannot be empty.' });
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
      author: authorId,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      message: 'Blog created successfully!',
      blog: savedBlog,
    });

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
