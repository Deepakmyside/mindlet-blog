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
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/ai', aiRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'MindletBlog backend is live' });
});


app.get("/", (req, res) => {
  res.send("🔥 Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
