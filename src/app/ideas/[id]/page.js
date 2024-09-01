"use client"
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Navbar from '@/components/Navbar';
import EmojiConfetti from '@/components/emoji_confetti';

const IdeaPage = ({ params }) => {

  const id = params?.id;

  const [wallet, setwallet] = useState('');
  const [idea, setIdea] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get('idea_wallet');
      setwallet(loggedin);
    };
    call();
  }, []);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/idea/${id}`);
        const data = await res.json();
        setIdea(data.idea);
        console.log("ideas fetch", data)
        setloading(false);
      } catch (err) {
        console.error('Failed to fetch ideas:', err);
        setloading(false);
      }
    };
    
    fetchIdea();
  }, []);

  return (
    <>
      <header>
        <nav class="bg-gradient-to-r from-[#000000] via-gray-800 to-[#000000] dark:bg-gray-800 px-4 lg:px-6 py-2.5 border-b border-purple-500 h-[9vh]">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" class="flex items-center">
              <img
                src="/sharetos.png"
                class="mr-3 h-6 sm:h-9"
                alt=""
              />
            </Link>

            <div className="flex gap-6">

            { wallet && (
            <div className="flex items-center lg:order-1">
              <Link
                href="/create"
              >  
                <button className="p-[3px] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-4 py-1.5  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  Create Idea
                  </div>
                </button>
              </Link>
            </div>
            )}

            <div class="flex items-center lg:order-2">
              <Navbar />
            </div>

            </div>
          </div>
        </nav>
      </header>

      <div
        className="px-10 py-20 min-h-screen"
        style={{ background: 'radial-gradient(circle, #312E81 , #000000)' }}
      >
        <div
          className="flex gap-6"
        >
          <div className="w-4/5 border border-gray-500 rounded-xl"
          style={{
            boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
            <div className="flex flex-row gap-4">
              <div
                className="relative p-10 rounded-xl w-full"
                style={{
                  background:
                    'radial-gradient(circle at top left, #9b59b6 10%, #312E81 50%, black)',
                  transition: 'background 0.5s ease-out',
                }}
              >
                <div className="text-white text-3xl font-semibold mb-10">
                  {idea?.title}
                </div>

                <div className="flex justify-between text-white">
                  <div style={{ fontSize: '15px' }}>{idea?.userId}</div>
                  <div
                    className="px-2 py-1 rounded -mt-2"
                    style={{ fontSize: '15px' }}
                  >
                    {idea?.category}
                  </div>
                  <div
                    className="uppercase px-2 py-1 rounded -mt-2"
                    style={{
                      fontSize: '14px',
                      color: '#5DEBD7',
                    }}
                  >
                    Status
                  </div>

                  <div
                    className="px-2 py-1 rounded -mt-2"
                    style={{
                      fontSize: '15px',
                      color: '#FFCAD4',
                    }}
                  >
                    {idea?.vote_count} ❤️
                  </div>

                  <div
                    className="-mt-4"
                  >
                   <EmojiConfetti />
                  </div>

                  

                </div>

                <div className="text-gray-300 text-xl mt-16 font-bold">
                  Problem Solve:
                </div>
                <div className="text-gray-300 text-md mt-4">
                {idea?.problem_solved}
                </div>

                <div className="text-gray-300 text-xl mt-10 font-bold">
                  Possible Solution:
                </div>
                <div className="text-gray-300 text-md mt-4">
                {idea?.possible_solution}
                </div>

                <div className="text-gray-300 text-xl mt-10 font-bold">
                  Resources:
                </div>
                <div className="text-gray-300 text-md mt-4">
                {idea?.resources}
                </div>

                <div className="text-gray-300 text-xl mt-10 font-bold">
                  Additional:
                </div>
                <div className="text-gray-300 text-md mt-4">
                {idea?.additional}
                </div>
                
              </div>
            </div>
          </div>

          <div className="w-2/5 border border-gray-500 rounded-xl" 
          style={{
            boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
<div className="text-center text-white text-lg py-4 border-b">Comments</div>

          </div>


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
    </>
  );
};

export default IdeaPage;
