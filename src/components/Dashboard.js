"use client"
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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

        target.style.background = `radial-gradient(circle at top, #539b82, transparent), radial-gradient(circle at ${xPercent}% ${yPercent}%, #aba564, transparent)`;
      };
    
      const handleMouseLeave = (e) => {
        e.currentTarget.style.background = 'radial-gradient(circle at top, #539b82, transparent)';
      };

      const filteredIdeas = selectedCategory === 'All Categories'
    ? ideas
    : ideas.filter((idea) => idea.category === selectedCategory);

  return (
    <div
      className="px-0 py-0 w-full h-[91vh]"
      style={{ background: 'radial-gradient(circle, #312E81 , #000000)' }}
    >
      <div
        className="flex "
        style={{
          boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="w-1/4 pb-8 pt-8 px-8" 
        // style={{ maxHeight: '700px', overflowY: 'auto' }}
        >
          <div className="text-xl font-bold text-white border-b border-gray-500 pb-4 mb-2">
            Categories
          </div>

          {['All Categories', 'Payment', 'ConsumerDapp', 'Nft', 'DeFi', 'DePin', 'Gaming', 'Social', 'AI', 'Content', 'DeveloperTooling', 'Community'].map((category) => (
            <div
              key={category}
              className={`text-white py-3 px-4 rounded-lg cursor-pointer ${selectedCategory === category ? 'bg-gradient-to-r from-[#FFFFFF30] via-[#9b59b630] to-[#FFFFFF30] border border-gray-500' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}

        </div>

        <div className="w-3/4 border border-gray-500 rounded-lg mt-[1vh] mb-4 mr-4 pt-6 px-8" style={{ maxHeight: '800px', overflowY: 'auto' }}>
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
                className="relative cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at top, #539b82, transparent)',
                  transition: 'background 0.5s ease-out',
                  width: 'calc(50% - 1rem)', // Adjust width to ensure wrapping
                  boxSizing: 'border-box',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >

<CardContainer className="inter-var">
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {idea.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {idea.problem_solved.substring(0, 100)}...
        </CardItem>
        {/* <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem> */}
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Status
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
             {idea.category}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>

                {/* <div className="text-white text-lg font-semibold mb-4">
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
                </div> */}
              </Link>
            ))}

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
