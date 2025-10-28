import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const gotoShop = () => navigate("/Productdetail");

  return (
    <nav className="flex justify-between items-center bg-blue-100 px-8 py-5 text-gray-700 font-poppins shadow-lg backdrop-blur-sm border border-blue-200/50 relative z-20 rounded-2xl mx-4 my-3 overflow-hidden">
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-blue-50/30 to-blue-100/40"></div>
      
      {/* Logo */}
      <div className="logo relative z-10">
        <a href="/home" className="block">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-md border border-gray-200/50">
            <img
              src="/public/seld.png"
              alt="logo"
              className="max-w-[140px] transition-all duration-300 ease-out hover:brightness-105"
            />
          </div>
        </a>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div
        className="hamburger md:hidden text-2xl cursor-pointer relative z-10 bg-white/80 backdrop-blur-sm rounded-lg w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md border border-gray-200/50"
        onClick={toggleSidebar}
      >
        <span className="text-gray-600">☰</span>
      </div>

      {/* Navigation Links */}
      <ul
        className={`fixed top-0 right-0 h-full w-[300px] bg-blue-50/95 backdrop-blur-xl flex flex-col items-center justify-center gap-5 text-base font-semibold transition-all duration-500 shadow-xl border-l border-blue-200/50 rounded-l-2xl md:static md:flex-row md:h-auto md:w-auto md:shadow-none md:gap-6 md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 relative z-10`}
      >
        {/* Subtle Mobile Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-blue-50/20 to-blue-100/25 md:hidden rounded-l-2xl"></div>

        {/* Close Button (Mobile Only) */}
        <span
          className="absolute top-6 right-6 text-2xl cursor-pointer md:hidden bg-gray-100 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-md text-gray-600 border border-gray-200/50"
          onClick={closeSidebar}
        >
          ✕
        </span>

        <li className="group relative">
          <button
            onClick={gotoShop}
            className="relative px-5 py-2.5 rounded-lg text-gray-600 font-medium bg-blue-50/60 backdrop-blur-sm border border-blue-100/50 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200/50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">🏪 Shop</span>
          </button>
        </li>

        <li className="group relative">
          <a
            href="/Notification"
            className="relative px-5 py-2.5 rounded-lg text-gray-600 font-medium bg-green-50/60 backdrop-blur-sm border border-green-100/50 hover:bg-green-100 hover:text-green-700 hover:border-green-200/50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">🔔 Notifications</span>
          </a>
        </li>

        <li className="group relative">
          <a
            href="/Contactus"
            className="relative px-5 py-2.5 rounded-lg text-gray-600 font-medium bg-orange-50/60 backdrop-blur-sm border border-orange-100/50 hover:bg-orange-100 hover:text-orange-700 hover:border-orange-200/50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">📞 Contact</span>
          </a>
        </li>

        <li className="group relative">
          <a
            href="/soldproducts"
            className="relative px-5 py-2.5 rounded-lg text-gray-600 font-medium bg-cyan-50/60 backdrop-blur-sm border border-cyan-100/50 hover:bg-cyan-100 hover:text-cyan-700 hover:border-cyan-200/50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">📊 Stats</span>
          </a>
        </li>

        <li className="group relative">
          <a
            href="/supplier"
            className="relative px-5 py-2.5 rounded-lg text-gray-600 font-medium bg-indigo-50/60 backdrop-blur-sm border border-indigo-100/50 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200/50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">🚚 Suppliers</span>
          </a>
        </li>

        <li className="group relative">
          <a
            href="/logout"
            className="relative px-5 py-2.5 rounded-lg text-gray-600 font-medium bg-red-50/60 backdrop-blur-sm border border-red-100/50 hover:bg-red-100 hover:text-red-700 hover:border-red-200/50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">🚪 Logout</span>
          </a>
        </li>
      </ul>

      {/* Subtle Decorative Elements */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
    </nav>
  );
}

export default Navbar;