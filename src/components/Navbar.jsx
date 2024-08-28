"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { animated, useSpring } from 'react-spring';
import { useKeylessAccounts } from "@/lib/useKeylessAccounts";
// import GoogleLogo from "@/components/GoogleLogo";
// import { collapseAddress } from "@/lib/utils";
import useAptos from "../../context/useAptos";
import {Account} from '@aptos-labs/ts-sdk';

const Navbar = () => {
  const wallet = Cookies.get("idea_wallet");

  const { aptos, moduleAddress } = useAptos();

  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();
  console.log("activeAccount", activeAccount);

  const [password, setpassword] = useState("");
  const [passwordset, setpasswordset] = useState(false)
  const [passwordbox, setpasswordbox] = useState(false);
  const [savedresponse, setsavedresponse] = useState("");
  const [savedmessage, setsavedmessage] = useState("");

  const [hovered, setHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loginbox, setloginbox] = useState(false);
  const [accountdetails, setaccountdetails] = useState(false);
  const [balance, setbalance] = useState(null);
  const [faucetTrigger, setFaucetTrigger] = useState(false);

  const modalProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const logout = {
    color: hovered ? "red" : "grey",
  };

  const handleSubmit = () => {
    setpasswordset(true);
    setpasswordbox(false);
  };

  const onClose = () => {
    setpassword("");
    setpasswordset(false);
    setpasswordbox(false);
  };

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", "_blank");
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
      if (network === "Devnet") {

        // signing message
        const payload = {
          message: "Hello from Sharetos",
          nonce: Math.random().toString(16),
        };
        const signedMessage = await aptosWallet.signMessage(payload);
        // signing message
        setsavedmessage(signedMessage);

        setpasswordbox(true);
    }
      else {
        alert(`Switch to Devnet in your Petra wallet`);
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
                avatar_image_url: '', // Optional, adjust as needed
              }),
            });

            data = await res.json();
            console.log("after user create", data);

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
              console.log("done", data);
              if (res.ok) {
                Cookies.set('idea_wallet', savedresponse?.address, { expires: 7 });
                window.location.reload();
              }
            }
          }
        } catch (error) {
          console.error('Error during login/signup:', error);
        }
      };

      handleLoginOrSignup();

  }, [password]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(response.data)}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error('Error fetching avatar:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCookie = () => {
    Cookies.remove("idea_wallet");
    window.location.href = "/";
  };

  const signmessage = async () => {
    try {

    const balance = async (
      name,
      accountAddress,
     ) => {
      const amount = await aptos.getAccountAPTAmount({
        accountAddress,
      });
      console.log(`${name}'s balance is: ${amount}`);
      return amount;
    };

      const bob = Account.generate();

      await aptos.fundAccount({
        accountAddress: activeAccount.accountAddress,
        amount: 100_000_000,
      });      

      const transaction = await aptos.transferCoinTransaction({
          sender: activeAccount.accountAddress,
          recipient: bob.accountAddress,
          amount: 100,
      });
  
      const committedTxn = await aptos.signAndSubmitTransaction({ signer: activeAccount, transaction });
  
      const committedTransactionResponse = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });

      const senderBalance = await balance("Alice", activeAccount.accountAddress);
      const recieverBalance = await balance("Bob", bob.accountAddress);
  
      console.log("Transaction submitted successfully:", committedTransactionResponse);
    } catch (error) {
      console.error("Error signing and submitting transaction:", error);
    }
  };

  const collapseAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {!wallet && !activeAccount && (
<button 
// onClick={()=>{setloginbox(true)}} 
onClick={connectToPetra}
className="px-4 text-white font-bold">Connect Wallet</button>
      )}
    { wallet && (
      <div className="flex gap-4">
      {/* <Link href="/profile"> */}
      {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{width: 40}}/>} 
      {/* </Link> */}
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

{
  activeAccount && !wallet && (
            <div className="relative">
              <button
                className="block w-full text-left rounded-full text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                // style={{ backgroundColor: "#253776" }}
            // Toggle dropdown on button click
              >
                <div 
               onClick={() => {
                navigator.clipboard.writeText(
                  activeAccount?.accountAddress.toString()
                );
              }}
              className="flex justify-center items-center gap-4 rounded-lg px-4 font-semibold text-black" style={{marginTop:'5px', cursor: 'pointer' }}>
                <Link href="/profile">{avatarUrl && <img src={avatarUrl} alt="Avatar" style={{width: 45}}/>} </Link>
                {/* <GoogleLogo /> */}
                <div style={{marginLeft:'-10px'}}>{collapseAddress(activeAccount?.accountAddress.toString())}</div>
                <button onClick={()=>{setaccountdetails(!accountdetails)}} className="text-2xl">&#11167;</button>
              </div>
              </button>
              {accountdetails && (
                <div
                  className="absolute right-0 mt-2 w-44 origin-top-right rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{ backgroundColor: "#20253A" }}
                >
                  <div className="py-2 px-10">
                  <div className="mt-2">Balance: {balance/100000000} APTs</div>
                  <div
                  className="flex gap-4 justify-center mt-4" style={{color: 'green', cursor: 'pointer' }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      activeAccount?.accountAddress.toString()
                    );
                  }}
                >
                  <p className="text-lg ml-2">
                  {activeAccount?.accountAddress.toString().slice(0, 6)}...{activeAccount?.accountAddress.toString().slice(-4)}
                  </p>
                  <div>Copy</div>
                </div>
                  <div className="mt-4" style={{color: 'red', cursor: 'pointer' }} onClick={disconnectKeylessAccount}>Log Out</div>
                  </div>
                </div>
              )}
            </div>
  )}

{ loginbox && (<animated.div style={modalProps} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-16 rounded-lg flex gap-y-6 justify-center w-[30rem] items-center flex-col text-center relative">
        <h2 className="text-2xl font-bold mb-4">Login Options</h2>

        <button className="bg-grad hover:bg-gradtrans text-black px-6 py-2 rounded-full" onClick={connectToPetra}>
        Connect with Petra
        </button>
        <div className="bg-grad hover:bg-gradtrans text-black px-8 py-2 rounded-full">
              <Link href={'/login'}>Login with google</Link >
          </div>
      </div>
    </animated.div>)}


    { passwordbox && (<animated.div style={modalProps} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-16 rounded-lg flex gap-y-6 justify-center w-[30rem] items-center flex-col text-center relative">
        <h2 className="text-2xl font-bold mb-4">Enter Password</h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />
        <div className="flex gap-10">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </animated.div>)}

    </div>
  );
};

export default Navbar;
