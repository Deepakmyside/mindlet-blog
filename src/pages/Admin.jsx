import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminContent from "@/components/AdminContent";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("my");

  return (
   
        <div className="min-h-screen  flex flex-col md:flex-row bg-[#fdfcf9]">

      {/* Sidebar for Desktop and Topbar for Mobile */}
   
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-grow p-2 md:p-5 ">
        <AdminContent activeTab={activeTab} />
      </main>
    </div>
  
  );
};

export default Admin;
