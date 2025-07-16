const express = require('express');
const blogController = require('../controllers/blogController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const multer = require('multer');


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits:{
    fileSize: 5 * 1024 * 1024 } });


router.post('/', authMiddleware, upload.single('image'), blogController.createBlog);
router.get("/user, verifyToken, getUserBlogs");

module.exports = router;

