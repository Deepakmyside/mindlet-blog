const Blog = require('../models/Blog');

const toggleLikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user.id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      message: "Like status updated",
      liked: !alreadyLiked,
      likes: blog.likes.length
    });

  } catch (error) {
    console.error("Toggle like error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = toggleLikeBlog;
