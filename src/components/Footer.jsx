// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="  bg-gray-900 text-white w-full mt-auto">
      <div className= "px-5 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-7xl mx-auto ">
        <div>
          <h2 className="text-lg font-semibold mb-2">Mindlet</h2>
          <p className="text-sm text-gray-400">A place to share your thoughts and grow.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Explore</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex gap-2 flex-wrap">
            {["Health", "Crypto", "Startup", "Bhakti"].map(tag => (
              <span key={tag} className="bg-gray-700 px-2 py-1 rounded text-xs">#{tag}</span>
            ))}
          </div>
        </div>

        </div>
        </footer>


        

      
    
  );
};

export default Footer;
