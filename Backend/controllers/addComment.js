const Blog = require('../models/Blog');

const addComment = async (req, res) => {
  try {
    const { text, name } = req.body;
    const userId = req.user.id;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = {
      user: req.user._id,
        name: req.user.name, // ✅ Store author's name
        text: req.body.text,
      createdAt: new Date()
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment
    });
  } catch (error) {
    console.error("Add comment error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = addComment;
