import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Pygmalion</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
            <a href="#benefits" className="text-gray-700 hover:text-indigo-600">Benefits</a>
            <a href="#pricing" className="text-gray-700 hover:text-indigo-600">Pricing</a>
            <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;