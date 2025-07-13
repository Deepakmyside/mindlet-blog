import React from "react";

const tabs = [
  { key: "analytics", label: "📈 Analytics " },
  { key: "add", label: "✍️ Add Blog" },
  { key: "my", label: "📚 My Blogs" },
];

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="md:w-60  w-full bg-orange-200 border-r border-gray-200 shadow-sm mt-10  ">
      <div className="flex md:flex-col flex-row justify-around items-center gap-2 md:gap-4 px-4 py-4 mt-3">

        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-center px-4 py-2 rounded-md text-sm font-medium 
              ${
                activeTab === tab.key
                  ? "bg-[rgb(255,107,0)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;


   





