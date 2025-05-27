import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo with enhanced styling */}
          <div className="flex-shrink-0 group">
            <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl tracking-tight group-hover:text-purple-400 transition-colors duration-300 cursor-pointer">
              Agents
              <span className="inline-block w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ml-1 animate-pulse"></span>
            </h1>
          </div>

          {/* Navigation menu (hidden on mobile, can be expanded later) */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Pricing
            </a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Docs
            </a>
          </div> */}

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Login button */}
            <Link href={"/signup"}>
            <button className="text-gray-300 hover:text-white transition-all duration-200 px-5 py-2.5 rounded-xl hover:bg-gray-800/60 font-medium border border-transparent hover:border-gray-700/50">
              Login
            </button>
            </Link>
            
            {/* Get Started button */}
            <button className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white px-7 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </nav>
  );
};

export default Navbar;