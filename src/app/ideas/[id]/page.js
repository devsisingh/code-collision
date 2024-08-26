import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const IdeaPage = () => {
  return (
    <>
      <header>
        <nav class="bg-gradient-to-r from-blue-900 via-gray-800 to-blue-900 dark:bg-gray-800 px-4 lg:px-6 py-2.5">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" class="flex items-center">
              <img src="/sharetos.png" class="mr-3 h-6 sm:h-9" alt="" />
              {/* <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" style={righteous.style}>
                ShareTos
              </span> */}
            </Link>

            <div className="flex gap-10">
              {/* Move the "Create Idea" button before the Navbar */}
              <div className="flex items-center lg:order-1">
                <Link
                  href="/create"
                  className="block py-2 pr-4 pl-3 text-gray-700 font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Create Idea
                </Link>
              </div>

              <div class="flex items-center lg:order-2">
                <Navbar />
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    class="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        className="px-10 py-20"
        style={{ background: 'radial-gradient(circle, #312E81 , #000000)' }}
      >
        <div
          className="flex gap-6"
        >
          <div className="w-3/5 border border-gray-500 rounded-xl"
          style={{
            boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
            <div className="flex flex-row gap-4">
              <div
                className="relative p-10 rounded-xl"
                style={{
                  background:
                    'radial-gradient(circle at top left, #9b59b6 10%, #312E81 50%, black)',
                  transition: 'background 0.5s ease-out',
                }}
              >
                <div className="text-white text-3xl w-2/3 font-semibold mb-10">
                  Web3 GoFundMe - Transparent Donation Matching
                </div>

                <div className="flex justify-between text-white">
                  <div style={{ fontSize: '15px' }}>Twitter Id</div>
                  <div
                    className="px-2 py-1 rounded -mt-2"
                    style={{ fontSize: '15px' }}
                  >
                    Category
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
                    20 ❤️
                  </div>

                  <div
                    className="px-10 py-1 rounded -mt-2"
                    style={{
                      fontSize: '14px',
                      backgroundColor: '#EABF9F',
                      color: '#A35709',
                    }}
                  >
                    Vote 👍🏽
                  </div>

                </div>

                <div className="text-gray-300 text-xl mt-16 font-bold">
                  Problem Solve:
                </div>
                <div className="text-gray-300 text-md mt-4">
                  Allowing donors to maximize their impact without the hassle of
                  manual reconciliation. Existing fundraising platforms do not
                  offer a seamless, crypto-powered solution that simplifies the
                  matching process...
                </div>

                <div className="text-gray-300 text-xl mt-10 font-bold">
                  Possible Solution:
                </div>
                <div className="text-gray-300 text-md mt-4">
                  Allowing donors to maximize their impact without the hassle of
                  manual reconciliation. Existing fundraising platforms do not
                  offer a seamless, crypto-powered solution that simplifies the
                  matching process...
                </div>

                <div className="text-gray-300 text-xl mt-10 font-bold">
                  Resources:
                </div>
                <div className="text-gray-300 text-md mt-4">
                  Allowing donors to maximize their impact without the hassle of
                  manual reconciliation. Existing fundraising platforms do not
                  offer a seamless, crypto-powered solution that simplifies the
                  matching process...
                </div>
                
              </div>
            </div>
          </div>

          <div className="w-2/5 border border-gray-500 rounded-xl" 
          style={{
            boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
<div className="text-center text-white text-lg py-4 border-b">Live Chat</div>

          </div>

        </div>
      </div>
    </>
  );
};

export default IdeaPage;
