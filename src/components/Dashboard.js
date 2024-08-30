"use client"
import React, {useState, useEffect} from 'react';
import Link from 'next/link';

const Dashboard = () => {

  const [loading, setloading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setloading(true);
        const res = await fetch('/api/idea');
        const data = await res.json();
        setIdeas(data.ideas);
        console.log("ideas fetch", data)
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
    
        target.style.background = `radial-gradient(circle at top, #9b59b6, transparent), radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255, 255, 255, 0.3), transparent)`;
      };
    
      const handleMouseLeave = (e) => {
        e.currentTarget.style.background = 'radial-gradient(circle at top, #9b59b6, transparent)';
      };

      const filteredIdeas = selectedCategory === 'All Categories'
    ? ideas
    : ideas.filter((idea) => idea.category === selectedCategory);

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

          {['All Categories', 'Payment', 'ConsumerDapp', 'Nft', 'DeFi', 'DePin', 'Gaming', 'Social', 'AI', 'Content', 'DeveloperTooling', 'Community'].map((category) => (
            <div
              key={category}
              className={`text-white py-3 px-4 mt-4 rounded-lg cursor-pointer ${selectedCategory === category ? 'bg-gradient-to-r from-[#FFFFFF30] via-[#9b59b630] to-[#FFFFFF30] border border-gray-500' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}

        </div>

        <div className="w-3/4 border border-gray-500 rounded-lg mt-4 mb-4 mr-4 pt-6 px-8" style={{ maxHeight: '850px', overflowY: 'auto' }}>
          <div className="text-xl font-bold text-white border-b border-gray-500 pb-4">
            {selectedCategory}
          </div>

    <div className="my-10"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      maxWidth: '100%',
    }}>
            {filteredIdeas?.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.id}`}
                className="relative border border-gray-500 p-4 rounded-xl cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at top, #9b59b6, transparent)',
                  transition: 'background 0.5s ease-out',
                  width: 'calc(50% - 1rem)', // Adjust width to ensure wrapping
                  boxSizing: 'border-box',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="text-white text-lg font-semibold mb-4">
                  {idea.title}
                </div>

                <div className='flex justify-between text-white items-center'>
                  <div style={{ fontSize: '12px' }} className="w-1/3">{idea.userId}</div>
                  <div className="px-2 py-1 rounded -mt-2 w-1/3 text-center" style={{ fontSize: '12px' }}>
                    {idea.category}
                  </div>
                  <div className="uppercase px-2 py-1 rounded -mt-2 text-center" style={{ fontSize: '11px', backgroundColor: '#22577A', color: '#5DEBD7' }}>
                    Status
                  </div>
                </div>

                <div className="text-gray-300 text-sm mt-6">
                  <span className="font-bold">Problem it solves: </span>{idea.problem_solved.substring(0, 100)}...
                </div>

                <div className="text-gray-300 text-sm mt-6">
                <span className="font-bold">Possible solution: </span>{idea.possible_solution.substring(0, 100)}...
                </div>

                <div className="text-gray-300 text-sm mt-6">
                <span className="font-bold">Resources: </span>{idea.resources[0].substring(0, 100)}...
                </div>

                <div className="text-gray-300 text-sm mt-6">
                <span className="font-bold">Additional: </span>{idea.additional.substring(0, 100)}...
                </div>
              </Link>
            ))}
          {/* </div> */}

          {loading && (
        <div
          style={{ backgroundColor: "#222944E5" }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative p-4 w-full max-h-full">
            <div className="relative rounded-lg">
              <div className="flex justify-center gap-4">
                <img
                  src="/smallloader.gif"
                  alt="Loading icon"
                  className='w-20'
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
