'use client';
import './globals.css';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <Head>
          <title>ShareTos</title>
          <meta
            name="description"
            content="ShareTos is an innovative Web3 platform designed to enable users to share, `vote`, and collaborate on groundbreaking ideas in a decentralized environment. 
Our goal is to create a space where creativity thrives through `real-time communication`, transparent development, and `community-driven` collaboration."
          />
        </Head>
        <body
          className={`bg-gradient bg-cover bg-no-repeat w-full min-h-screen flex justify-between h-screen flex-col items-center ${inter.className}`}
        >
          <div className='w-full'>{children}</div>
        </body>
      </html>
  );
}