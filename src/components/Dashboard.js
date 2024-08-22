"use client"
import React from 'react';

const Dashboard = () => {

    const handleMouseMove = (e) => {
        const target = e.currentTarget;
        const { clientX, clientY } = e;
        const { left, top, width, height } = target.getBoundingClientRect();
        const xPercent = ((clientX - left) / width) * 100;
        const yPercent = ((clientY - top) / height) * 100;
    
        target.style.background = `radial-gradient(circle at top, #9b59b6, transparent), radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255, 255, 255, 0.3), transparent)`;
      };
    
      const handleMouseLeave = (e) => {
        e.currentTarget.style.background = 'radial-gradient(circle at top, #9b59b6, transparent)';
      };

  return (
    <div
      className="px-40 py-20"
      style={{ background: 'radial-gradient(circle, #312E81 , #000000)' }}
    >
      <div
        className="flex border border-gray-500 rounded-xl"
        style={{
          boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="w-1/4 pb-8 pt-10 px-8">
          <div className="text-xl font-bold text-white border-b border-gray-500 pb-4">
            Categories
          </div>
        </div>

        <div className="w-3/4 border border-gray-500 rounded-lg mt-4 mb-4 mr-4 pt-6 px-8">
          <div className="text-xl font-bold text-white border-b border-gray-500 pb-4">
            All Categories
          </div>

          <div className="flex flex-row gap-4 my-10">
            
          <div
      className="relative border border-gray-500 p-4 rounded-xl"
      style={{
        background: 'radial-gradient(circle at top, #9b59b6, transparent)',
        transition: 'background 0.5s ease-out',
      }}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    >
      <div className="text-white text-lg font-semibold mb-4">
        Web3 GoFundMe - Transparent Donation Matching
      </div>
      <div className="text-gray-300 text-sm">
        Allowing donors to maximize their impact without the hassle of manual
        reconciliation. Existing fundraising platforms do not offer a seamless,
        crypto-powered solution that simplifies the matching process.
      </div>
    </div>


    <div
      className="relative border border-gray-500 p-4 rounded-xl"
      style={{
        background: 'radial-gradient(circle at top, #9b59b6, transparent)',
        transition: 'background 0.5s ease-out',
      }}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    >
      <div className="text-white text-lg font-semibold mb-4">
        Web3 GoFundMe - Transparent Donation Matching
      </div>
      <div className="text-gray-300 text-sm">
        Allowing donors to maximize their impact without the hassle of manual
        reconciliation. Existing fundraising platforms do not offer a seamless,
        crypto-powered solution that simplifies the matching process.
      </div>
    </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
