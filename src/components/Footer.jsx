import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full mt-auto">
      <div className="px-5 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Mindlet Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Mindlet</h2>
          <p className="text-sm text-gray-400">A place to share your thoughts and grow.</p>
        </div>

        {/* Explore Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Explore</h2>
          <ul className="flex gap-4 flex-wrap text-sm text-gray-300">

            <li><Link to="/about" className="hover:text-orange-400 transition">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-orange-400 transition">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex gap-2 flex-wrap">
            {["Health", "Crypto", "Startup", "Bhakti"].map(tag => (
              <span key={tag} className="bg-gray-700 px-2 py-1 rounded text-xs">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Credit Note */}
      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-800">
        © {new Date().getFullYear()} MindletBlog — Crafted with care by <span className="text-orange-500 font-medium">~Team KDee</span>
      </div>
    </footer>
  );
};

export default Footer;
