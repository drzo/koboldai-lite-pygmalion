import React from 'react';

function Hero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Experience Next-Gen AI Chat
          </h1>
          <p className="text-xl text-indigo-100 mb-8">
            Engage with the most advanced AI chat platform powered by cutting-edge language models
          </p>
          <a href="#" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 transition duration-300">
            Try Pygmalion Free
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;