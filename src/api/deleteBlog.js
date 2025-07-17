// frontend/src/api/deleteBlog.js
import axios from "axios";

const deleteBlog = async (blogId, token) => {
  return await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default deleteBlog;
