import AddBlog from "@/pages/AddBlog";
import MyBlogs from "@/pages/MyBlogs";
import AnalyticsTab from "../pages/AnalyticTab";
const AdminContent = ({ activeTab }) => {
  if (activeTab === "analytics") return <AnalyticsTab />;
  if (activeTab === "add") return <AddBlog />;
  if (activeTab === "my") return <MyBlogs />;
};

export default AdminContent;
