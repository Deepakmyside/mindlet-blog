// src/components/Layout.jsx
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-[#fffdf6] min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow bg-[#fffdf6]">{children}</main>
    </div>
  );
}
