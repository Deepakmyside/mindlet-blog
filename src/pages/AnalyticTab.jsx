import React from "react";

const AnalyticsTab = () => {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center text-center py-16 px-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">📊 Analytics Dashboard</h2>
      <p className="text-gray-600 max-w-md">
        We’re currently building something insightful and exciting here.  
        <span className="text-orange-500 font-semibold"> Full analytics coming soon!</span>
      </p>
      <div className="mt-6 text-sm text-gray-400 italic">
        UI preview only — no live stats yet 🛠️
      </div>
   
 <div className="text-center mt-10 text-gray-500 font-medium text-sm">
  ~team <span className="text-orange-500">(mindletBlog)</span>
</div>
 </div>
  );
};

export default AnalyticsTab;