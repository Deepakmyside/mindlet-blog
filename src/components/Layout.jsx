// src/components/Layout.jsx
import Navbar from "./Navbar";
export default function Layout({ children }) {
  return (
    <div className="bg-[#fdf6e3] min-h-screen">
      <Navbar/>
      <div className="pt-[80px] px-4">{children}</div> {/* Space below navbar */}
    </div>
  );
}

