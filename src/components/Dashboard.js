'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GoNorthStar } from "react-icons/go";
import { FaMoneyBillWave, FaGamepad, FaRobot, FaUsers } from 'react-icons/fa';
import { RiNftLine, RiTeamLine } from 'react-icons/ri';
import { MdOutlineSmartToy, MdOutlineContentPaste, MdWifiTethering } from 'react-icons/md';
import { BsFileCode } from 'react-icons/bs';
import { BiGlobe } from 'react-icons/bi';

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [ideas, setIdeas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categoryIcons = {
    'All Categories': <GoNorthStar />,
    'Payment': <FaMoneyBillWave />,
    'ConsumerDapp': <BiGlobe />,
    'Nft': <RiNftLine />,
    'DeFi': <MdOutlineSmartToy />,
    'DePin': <MdWifiTethering />,
    'Gaming': <FaGamepad />,
    'Social': <FaUsers />,
    'AI': <FaRobot />,
    'Content': <MdOutlineContentPaste />,
    'DeveloperTooling': <BsFileCode />,
    'Community': <RiTeamLine />,
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setloading(true);
        const res = await fetch('/api/idea');
        const data = await res.json();
        setIdeas(data.ideas);
        console.log('ideas fetch', data);
        setloading(false);
      } catch (err) {
        console.error('Failed to fetch ideas:', err);
        setloading(false);
      }
    };

    fetchIdeas();
  }, []);

  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const { clientX, clientY } = e;
    const { left, top, width, height } = target.getBoundingClientRect();
    const xPercent = ((clientX - left) / width) * 100;
    const yPercent = ((clientY - top) / height) * 100;

    target.style.background = `radial-gradient(circle at top, #539b82, transparent), radial-gradient(circle at ${xPercent}% ${yPercent}%, #312E81, transparent)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background =
      'radial-gradient(circle at top, #539b82, transparent)';
  };

  const filteredIdeas =
    selectedCategory === 'All Categories'
      ? ideas
      : ideas.filter((idea) => idea.category === selectedCategory);

  return (
    <div
      className="px-0 py-0 w-full h-[91vh]"
      style={{ background: 'radial-gradient(circle, #000000 , #000000)' }}
    >
      <div
        className="flex "
        style={{
          boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          className="w-1/4 pb-8 pt-8 px-8"
          // style={{ maxHeight: '700px', overflowY: 'auto' }}
        >
          <div className="text-xl font-bold text-white border-b border-gray-500 pb-4 mb-2">
            Categories
          </div>

          {[
            'All Categories',
            'Payment',
            'ConsumerDapp',
            'Nft',
            'DeFi',
            'DePin',
            'Gaming',
            'Social',
            'AI',
            'Content',
            'DeveloperTooling',
            'Community',
          ].map((category) => (
            <div
              key={category}
              className={`text-white py-3 px-4 rounded-lg cursor-pointer flex gap-4 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FFFFFF30] via-[#539b8230] to-[#FFFFFF30] border border-gray-500'
                  : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="mt-1">{categoryIcons[category]}</div>
              <div>{category}</div>
            </div>
          ))}
        </div>

        <div
          className="w-3/4 border border-gray-500 rounded-lg mt-[1vh] mb-4 mr-4 pt-6 px-8"
          style={{ maxHeight: '800px', overflowY: 'auto' }}
        >
          <div className="text-xl font-bold text-white border-b border-gray-500 pb-4">
            {selectedCategory}
          </div>

          {filteredIdeas?.length === 0 && !loading && (
              <div className="h-[58vh] grid place-items-center w-full">
                <p className="text-white text-3xl text-center">No Idea Found 😕</p>
              </div>
            )}

          <div
            className="my-10 grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4"
          >
            {filteredIdeas?.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.id}`}
                className="relative cursor-pointer rounded-lg p-6 border-white/[0.2] border rounded-xl"
                style={{
                  background:
                    'radial-gradient(circle at top, #539b82, transparent)',
                  transition: 'background 0.5s ease-out',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                
                <div className="text-white text-xl font-semibold mb-4 capitalize">
                  {idea.title}
                </div>

                <div className="text-gray-300 text-sm my-6">
                  <span className="font-bold"></span>{idea.problem_solved.substring(0, 250)}...
                </div>

                <div className='flex justify-between text-white items-center'>
                  <div className="flex gap-4">
                    <div style={{ fontSize: '15px', color: '#FFCAD4', marginTop:'3px'}}>{idea?.vote_count} ❤️</div>
                  <div className="uppercase px-4 py-1.5 rounded-lg text-center" style={{ fontSize: '12px', backgroundColor: '#22577A', color: '#5DEBD7' }}>
                    Vote 👍🏽
                  </div>
                  </div>
                  <div className="px-4 py-1.5 rounded-lg text-center bg-white text-black font-bold" style={{ fontSize: '13px' }}>
                    {idea.category}
                  </div>
                </div>
                
              </Link>
            ))}
            
            <div className="h-[30vh] grid place-items-center w-full">
            </div>

            {loading && (
              <div
                style={{ backgroundColor: '#222944E5' }}
                className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                id="popupmodal"
              >
                <div className="relative p-4 w-full max-h-full">
                  <div className="relative rounded-lg">
                    <div className="flex justify-center gap-4">
                      <img
                        src="/smallloader.gif"
                        alt="Loading icon"
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
