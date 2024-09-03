'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { animated, useSpring } from 'react-spring';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const wallet = Cookies.get('idea_wallet');

  const [password, setpassword] = useState('');
  const [passwordset, setpasswordset] = useState(false);
  const [passwordbox, setpasswordbox] = useState(false);
  const [savedresponse, setsavedresponse] = useState('');
  const [savedmessage, setsavedmessage] = useState('');

  const [hovered, setHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loginbox, setloginbox] = useState(false);

  const notify = () =>  {toast.warn("Please connect your wallet", {
    position: "top-right",
  });
}

  const modalProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const logout = {
    color: hovered ? 'red' : 'grey',
  };

  const handleSubmit = () => {
    setpasswordset(true);
    setpasswordbox(false);
  };

  const onClose = () => {
    setpassword('');
    setpasswordset(false);
    setpasswordbox(false);
  };

  const getAptosWallet = () => {
    if ('aptos' in window) {
      return window.aptos;
    } else {
      window.open('https://petra.app/', '_blank');
    }
  };

  const connectToPetra = async () => {
    const aptosWallet = getAptosWallet();
    try {
      const response = await aptosWallet.connect();
      console.log(response); // { address: string, publicKey: string }
      setsavedresponse(response);
      // Check the connected network
      const network = await aptosWallet.network();
      if (network === 'Testnet') {
        // signing message
        const payload = {
          message: 'Hello from Sharetos',
          nonce: Math.random().toString(16),
        };
        const signedMessage = await aptosWallet.signMessage(payload);
        // signing message
        setsavedmessage(signedMessage);

        setpasswordbox(true);
      } else {
        alert(`Switch to Testnet in your Petra wallet`);
      }
    } catch (error) {
      console.error(error); // { code: 4001, message: "User rejected the request."}
    }
  };

  useEffect(() => {
    const handleLoginOrSignup = async () => {
      try {
        // First, try to log in the user
        let res = await fetch('/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wallet_address: savedresponse?.address,
            password: password,
          }),
        });

        let data = await res.json();

        if (res.ok) {
          // Successful login
          Cookies.set('idea_wallet', savedresponse?.address, { expires: 7 });
          window.location.reload();
        } else if (res.status == 404) {
          // User not found, proceed to sign-up
          res = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              wallet_address: savedresponse?.address,
              password: password,
              avatar_image_url: 'httpsc://examplesdfg.csom/iamages/avatar1.png', // Optional, adjust as needed
            }),
          });

          data = await res.json();
          console.log('after user create', data);

          if (res.ok) {
            // Successful registration, now log in
            res = await fetch('/api/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                wallet_address: savedresponse?.address,
                password: password,
              }),
            });

            data = await res.json();
            console.log('done', data);
            if (res.ok) {
              Cookies.set('idea_wallet', savedresponse?.address, {
                expires: 7,
              });
              window.location.reload();
            }
          }
        }
      } catch (error) {
        console.error('Error during login/signup:', error);
      }
    };

    handleLoginOrSignup();
  }, [passwordset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(
          response.data
        )}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error('Error fetching avatar:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCookie = () => {
    Cookies.remove('idea_wallet');
    window.location.href = '/';
  };

  return (
    <>
    <ToastContainer />
    <header className={'sticky top-0 z-50'}>
      <nav
        className="bg-gradient-to-r from-[#000000] via-gray-800 to-[#000000] dark:bg-gray-800 px-4 lg:px-6 py-2.5 h-[9vh] "
        style={{
          borderBottom: '2px solid',
          borderImage: 'linear-gradient(to right, #a16821, #3596c2) 1',
        }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img src="/sharetos.png" className="mr-3 h-6 sm:h-9" alt="" />
          </Link>
          {/*TODO: Show tooltip when user is not logged in, show create-idea btn, don't hide it*/}
          <div className="flex gap-6">
            { wallet ?
              (<div className="flex items-center lg:order-1">
                <Link href="/create">
                  <button className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#539b82] to-[#aba564] rounded-lg" />
                    <div className="px-4 py-1.5  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                      Create Idea
                    </div>
                  </button>
                </Link>
              </div>)
              :(
                <div className="flex items-center lg:order-1">
                  <button className="p-[3px] relative" onClick={notify}>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#539b82] to-[#aba564] rounded-lg" />
                    <div className="px-4 py-1.5  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                      Create Idea
                    </div>
                  </button>
              </div>
              )
            }

            <div className="flex items-center lg:order-2">
              <div>
                {!wallet && (
                  <button
                    onClick={connectToPetra}
                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6  text-white inline-block"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="relative flex space-x-0 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
                      <span>{`Connect Wallet`}</span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                        ></path>
                      </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                  </button>
                )}
                {wallet && (
                  <div className="flex gap-4">
                    {avatarUrl && (
                      <img src={avatarUrl} alt="Avatar" style={{ width: 40 }} />
                    )}
                    <div>
                      <div className="rounded-lg text-sm font-semibold text-center text-white">
                        {wallet.slice(0, 4)}...{wallet.slice(-4)}
                      </div>
                      <button
                        onClick={handleDeleteCookie}
                        style={logout}
                        className="mx-auto hover:text-red-400 text-black text-sm font-semibold"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}

                {loginbox && (
                  <animated.div
                    style={modalProps}
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20"
                  >
                    <div className="bg-white p-16 rounded-lg flex gap-y-6 justify-center w-[30rem] items-center flex-col text-center relative">
                      <h2 className="text-2xl font-bold mb-4">Login Options</h2>

                      <button
                        className="bg-grad hover:bg-gradtrans text-black px-6 py-2 rounded-full"
                        onClick={connectToPetra}
                      >
                        Connect with Petra
                      </button>
                      <div className="bg-grad hover:bg-gradtrans text-black px-8 py-2 rounded-full">
                        <Link href={'/login'}>Login with google</Link>
                      </div>
                    </div>
                  </animated.div>
                )}

                {passwordbox && (
                  <>
                    <animated.div
                      style={modalProps}
                      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20"
                    >
                      <div className="bg-black text-white p-10 rounded-lg flex gap-y-6 justify-center w-[30rem] items-center flex-col text-center relative">
                        {/* <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />
        <div className="flex gap-10">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
        </div> */}

                        <Tabs defaultValue="register" className="w-[400px]">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="register">Register</TabsTrigger>
                            <TabsTrigger value="login">Login</TabsTrigger>
                          </TabsList>
                          <TabsContent value="register">
                            <Card>
                              <div
                                style={{ textAlign: 'left', padding: '25px' }}
                              >
                                <div
                                  style={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Register
                                </div>
                                <div
                                  style={{ fontSize: '15px', color: 'grey' }}
                                >
                                  Register in the platform by entering your
                                  password.
                                </div>
                              </div>
                              <CardContent
                                className="space-y-2"
                                style={{ textAlign: 'left' }}
                              >
                                <div className="space-y-1">
                                  <Label htmlFor="name">Wallet Address</Label>
                                  <Input
                                    id="name"
                                    defaultValue={`${savedresponse?.address}`}
                                    readOnly
                                    style={{ backgroundColor: 'black' }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="password">Password</Label>
                                  <Input
                                    id="password"
                                    placeholder="Password"
                                    style={{ backgroundColor: 'black' }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="confirmpassword">
                                    Confirm Password
                                  </Label>
                                  <Input
                                    id="confirmpassword"
                                    placeholder="Confirm Password"
                                    style={{ backgroundColor: 'black' }}
                                  />
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button
                                  style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                  }}
                                  onClick={onClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  style={{ color: 'black' }}
                                  onClick={handleSubmit}
                                >
                                  Sign Up
                                </Button>
                              </CardFooter>
                            </Card>
                          </TabsContent>
                          <TabsContent value="login">
                            <Card>
                              <div
                                style={{ textAlign: 'left', padding: '25px' }}
                              >
                                <div
                                  style={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Login
                                </div>
                                <div
                                  style={{ fontSize: '15px', color: 'grey' }}
                                >
                                  Login using your entered password.
                                </div>
                              </div>
                              <CardContent
                                className="space-y-2"
                                style={{ textAlign: 'left' }}
                              >
                                <div className="space-y-1">
                                  <Label htmlFor="name">Wallet Address</Label>
                                  <Input
                                    id="name"
                                    defaultValue={`${savedresponse?.address}`}
                                    style={{ backgroundColor: 'black' }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="password">Password</Label>
                                  <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                      setpassword(e.target.value)
                                    }
                                    placeholder="Your Password"
                                    style={{ backgroundColor: 'black' }}
                                  />
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button
                                  style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                  }}
                                  onClick={onClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  style={{ color: 'black' }}
                                  onClick={handleSubmit}
                                >
                                  Sign In
                                </Button>
                              </CardFooter>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </animated.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
};

export default Navbar;
