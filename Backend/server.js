const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const aiRoutes = require('./routes/aiRoutes');
const axios = require('axios')
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://mind-let-blog.netlify.app",
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/ai', aiRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'MindletBlog backend is live' });
});


app.get("/", (req, res) => {
  res.send("🔥 Backend is running");
});

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
