// ✅ routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const multer = require('multer');;
const addComment = require('../controllers/addComment');
const router = express.Router();
const getBlogById = require("../controllers/getBlogById.js");
const storage = multer.memoryStorage();
const auth = require('../middleware/authMiddleware.js');
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const toggleLikeBlog = require('../controllers/toggleLikeBlog');
const deleteBlog =require('../controllers/blogController.js')




// ✅ Get all blogs of logged-in user
router.get('/myblogs', authMiddleware, blogController.getMyBlogs);

// ✅ Get all blogs
router.get("/", blogController.getAllBlogs); 

// ✅ Create new blog
router.post('/', authMiddleware, upload.single('image'), blogController.createBlog);

// ✅ Create new blog
router.get("/:id", getBlogById);

// ✅ Delete blog
router.delete('/:id', authMiddleware, blogController.deleteBlog);


//Like the blog
router.put("/:id/like", authMiddleware, toggleLikeBlog);
 
//Comment on Blog
router.post('/:id/comment', authMiddleware , addComment);
module.exports = router;
