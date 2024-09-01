'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { useState, useEffect , useRef} from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import useFonts from "@/components/hooks/useFonts";
import dynamic from 'next/dynamic';
import { useKeylessAccounts } from "@/lib/useKeylessAccounts";
import Dashboard from '@/components/Dashboard';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";


export default function Home() {
  const [wallet, setwallet] = useState('');
  
  const { righteous } = useFonts();

  const { ref, inView } = useInView({ threshold: 0.3 });
  const animation = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();

  
  
/** @typedef {string} OpenIdProvider */
  useEffect(() => {
    console.log("inView", inView);

    if (!inView) {
      animation.start({
        x: -300,
        opacity: 0,
        scale: 0,
      });
      animation2.start({
        scale: 0,
        opacity: 0,
        x: 300,
      });
      animation3.start({
        opacity: 0,
        y: 300,
      });
    } else {
      animation.start({
        x: 0,
        opacity: 1,
        scale: 1,
      });
      animation2.start({
        scale: 1,
        opacity: 1,
        x: 0,
      });
      animation3.start({
        y: 0,
        opacity: 1,
      });
    }
  }, [inView, animation, animation2]);

// ----------------------------------------------------------------------------------
 
  const [isAccountDataAvailable, setIsAccountDataAvailable] = useState(false);

  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();
  console.log("activeAccount", activeAccount);
  const walletaddr = Cookies.get("bingo_wallet");

  // console.log('sarvesh',accounts.current[0])
  useEffect(() => {
    if(activeAccount)
    {
      setIsAccountDataAvailable(!!activeAccount);
    }
    if(walletaddr)
    {
      setIsAccountDataAvailable(!!walletaddr);
    }
  }, [activeAccount, walletaddr]);

  const handleExploreClick = () => {
    if (!isAccountDataAvailable) {
      alert("Please login to access this page.");
    }
  };
  


  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get('idea_wallet');
      setwallet(loggedin);
    };
    call();
  }, []);

  const [scrollDirection, setScrollDirection] = useState('down');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const NoSSRComponent = dynamic(() => import('@/components/Redirect'), {
    ssr: false
  });
  
  return (
    <>
      <header>
        <nav class="bg-gradient-to-r from-[#000000] via-gray-800 to-[#000000] dark:bg-gray-800 px-4 lg:px-6 py-2.5 h-[9vh]"
        style={{
          borderBottom: '2px solid',
          borderImage: 'linear-gradient(to right, #a16821, #3596c2) 1',
        }}>
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
              <NoSSRComponent />
            </div>

            </div>
          </div>
        </nav>
      </header>
      <BackgroundBeamsWithCollision>
        <Dashboard />
      </BackgroundBeamsWithCollision>
    </>
  );
}
