'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { NFTStorage } from "nft.storage";
const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw" });
import 'react-datepicker/dist/react-datepicker.css';
import useFonts from "@/components/hooks/useFonts";

export default function Dashboard() {
  const [pagestatus, setpagestatus] = useState('create');

  const [ideatitle, setideatitle] = useState('');
  const [ideacategory, setideacategory] = useState('');
  const [twitterid, settwitterid] = useState('');
  const [twitterlink, settwitterlink] = useState('');
 
  const [problemSolved, setProblemSolved] = useState('');
  const [possibleSolution, setPossibleSolution] = useState('');
  const [resources, setResources] = useState('');
  const [loading, setLoading] = useState(false);
  const [creategamedone, setcreategamedone] = useState(false);


  async function saveIdea(snlData) {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(snlData),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log("IPFS Hash:", data.IpfsHash);
    } else {
      console.error("Error saving data:", await response.json());
    }
  }
  
  const creategame = async () => {
    const wallet = Cookies.get('idea_wallet');
    setLoading(true);

    try {

        let snlData = {
          title: ideatitle,
          category: ideacategory,
          twitterid: twitterid,
          twitterlink: twitterlink,
          problemSolved: problemSolved,
          possibleSolution: possibleSolution,
          resources: resources,
          creatorWalletAddress: wallet,
        };

        console.log("idea data", snlData);

      try{

        await saveIdea(snlData);

        console.log("game created")
        setcreategamedone(true);
  
        setTimeout(() => {
          window.location.replace('/');
        }, 2000);

      }catch (error){
        console.error('Error handling', error);
      }
    
    } catch (error) {
      console.error('Error handling', error);
    } finally {
      setLoading(false);
    }
  };

  const { righteous } = useFonts();

  return (
    <>
    <div className="z-10 w-full flex">
      <div className="z-10 w-full" style={{backgroundColor:'#C5FFF8'}}>
      <header>
        <nav class="bg-gradient-to-r from-blue-900 via-gray-800 to-blue-900 dark:bg-gray-800 px-4 lg:px-6 py-2.5">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" class="flex items-center">
              <img
                src="https://media3.giphy.com/media/SOb4AcaDitenU4XKdC/giphy.gif?cid=6c09b952ay7ttj24dpj0m92zo0jap80u7htlljkwc7yw4y8i&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                class="mr-3 h-6 sm:h-9"
                alt=""
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" style={righteous.style}>
                ShareTos
              </span>
            </Link>

            <div className="flex gap-10">

            {/* Move the "Create Idea" button before the Navbar */}
            <div className="flex items-center lg:order-1">
              <Link
                href="/launch"
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
      </div>
      </div>

    <main
      className="flex flex-col items-center justify-between lg:p-20 md:p-20 py-14"
      style={{ background: 'radial-gradient(circle, #312E81 , #000000)' }}
      // style={{ backgroundImage: `url("/launchbg.png")`}}
    >
      {/* Background div with blur */}
      <div
        style={{
          // filter: 'blur(8px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          // backgroundImage: `url("${bgImage}")`,
          top: 0,
          left: 0,
          zIndex: 0, // Ensure the blur layer is below the content
        }}
      />

      {pagestatus === 'create' && (
        <div className="w-full z-10 lg:px-60">
          <div
            className="px-10 py-10 rounded-2xl mt-0"
            style={{
              border: '1px solid #607d8b',
              boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
            // style={{
            //   border: '1px solid #0162FF',
            //   boxShadow: 'inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4)',
            //   backgroundColor:'#E5E7EB'
            // }}
          >
            <div>
              <div className="font-bold text-2xl text-white">Share your Idea with Community</div>
              <div className="lg:flex md:flex justify-between gap-4">
                <div className="lg:w-1/2 md:w-1/2 mt-10">
                <div>
                <div className='text-white mb-4 text-lg'>Idea Title</div>
              <input
                type="text"
                placeholder="Idea Title"
                value={ideatitle}
                onChange={(e) => setideatitle(e.target.value)}
                className="mb-8 shadow border appearance-none rounded-xl w-full py-4 px-6 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                style={{border: "1px solid #75E2FF", color:'black', backgroundColor:'#41C9E2'}}
              />
              </div>

              <div>
                <div className='text-white mb-4 text-lg'>Idea Title</div>
              <input
                type="text"
                placeholder="Idea Category"
                value={ideacategory}
                onChange={(e) => setideacategory(e.target.value)}
                className="mb-8 shadow border appearance-none rounded-xl w-full py-4 px-6 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                style={{border: "1px solid #75E2FF", color:'black', backgroundColor:'#41C9E2'}}
              />
              </div>
                                        
              </div>


              <div className="lg:w-1/2 md:w-1/2 mt-10">

              <div>
              <div className='text-white mb-4 text-lg'>Tweeter ID</div>
              <input
                type="text"
                placeholder="Twitter ID"
                value={twitterid}
                onChange={(e) => settwitterid(e.target.value)}
                className="mb-8 shadow border appearance-none rounded-xl w-full py-4 px-6 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                style={{border: "1px solid #75E2FF", color:'black', backgroundColor:'#41C9E2'}}
              />
              </div>

<div>
<div className='text-white mb-4 text-lg'>Tweeter Link</div>
<input
                type="text"
                placeholder="Tweeter Link"
                value={twitterlink}
                onChange={(e) => settwitterlink(e.target.value)}
                className="mb-8 shadow border appearance-none rounded-xl w-full py-4 px-6 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                style={{border: "1px solid #75E2FF", color:'black', backgroundColor:'#41C9E2'}}
              />
              </div>
                                        
              </div>
              
              </div>

              <div className='text-white mb-4 text-lg'>Idea Description</div>

              <textarea
  value={`Problem Solved:\n${problemSolved}\n\nPossible Solution:\n${possibleSolution}\n\nResources:\n${resources}`}
  onChange={(e) => {
    const value = e.target.value;

    // Use regex to capture each section's content
    const problemSolvedMatch = value.match(/Problem Solved:\n([\s\S]*?)\n\nPossible Solution:/);
    const possibleSolutionMatch = value.match(/Possible Solution:\n([\s\S]*?)\n\nResources:/);
    const resourcesMatch = value.match(/Resources:\n([\s\S]*)/);

    setProblemSolved(problemSolvedMatch ? problemSolvedMatch[1].trim() : '');
    setPossibleSolution(possibleSolutionMatch ? possibleSolutionMatch[1].trim() : '');
    setResources(resourcesMatch ? resourcesMatch[1].trim() : '');
  }}
  className="mb-10 shadow border appearance-none rounded-xl w-full py-4 px-6 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
  style={{
    border: "1px solid #75E2FF",
    color: 'black',
    backgroundColor: '#41C9E2',
    height: '180px', 
    resize: 'vertical', 
    overflowY: 'scroll'
  }}
/>


              <button
                onClick={creategame}
                className="rounded-lg py-2.5 px-14 text-white justify-center flex mx-auto text-xl"
                style={{ backgroundColor: '#9B86BD' }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {creategamedone && (
        <div
          style={{ backgroundColor: '#222944E5' }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
            <div className="relative rounded-lg shadow bg-black text-white">
              <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600"></div>

              <div className="p-4 space-y-4 pt-10">
                <p className="text-3xl text-center font-bold text-green-500">
                  Successfully Created!!
                </p>
                <p className="text-sm text-center pt-4 pb-20">
                  Redirecting you to Explore page to view your created game.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


{loading && (
        <div
          style={{ backgroundColor: "#222944E5" }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative p-4 w-full max-h-full">
            <div className="relative rounded-lg shadow">
              <div className="flex justify-center gap-4">
                <img
                  src="/dice_loader.gif"
                  alt="Loading icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
    </>
  );
}
