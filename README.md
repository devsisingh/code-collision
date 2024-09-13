![image](https://github.com/user-attachments/assets/a76a4896-78a5-427b-966a-b6018f7b56c1)
<br></br>
# ShareTos
The Web3 Idea Sharing and Community Platform

### [ShareTos Platform](https://sharetos.vercel.app/) | [ShareTos Smart Contract](https://explorer.aptoslabs.com/account/0x8ccc0aaa87309ab8c7f8c1c68e87e33732c03289a289701a3eaf75c78f283579/modules/code/sharetos?network=testnet)

## Overview
**ShareTos** is an innovative Web3 platform designed to enable users to share, `vote`, and collaborate on groundbreaking ideas in a decentralized environment. 
Our goal is to create a space where creativity thrives through `real-time communication`, transparent development, and `community-driven` collaboration.

## Features of ShareTos
1. **Web3 Onboarding & Authentication**:
   Users can seamlessly onboard to ShareTos using eco-friendly Web3 technologies like Aptos, ensuring secure and decentralized access. Social media, such as Twitter, can also be integrated as an authentication method, enhancing trust and accountability.
2. **On-Chain Voting**:
   All ideas shared on ShareTos undergo a transparent, on-chain voting process. This ensures that voting results are tamper-proof and publicly verifiable, allowing the community to decide which ideas have the most potential.
3. **Real-Time Collaboration & Development**:
   ShareTos features a live chat function, enabling users to share ideas and engage in real-time discussions. This fosters dynamic collaboration, where ideas can be refined, improved, and even jointly developed by teams formed within the platform.
4. **Idea Development Status**:
   Users can track the progress of ideas with status codes indicating whether an idea is being developed, not yet started, or completed. This keeps the community engaged and excited about the progress of their favorite projects.
5. **Categorization & Filtering**:
   ShareTos organizes ideas into categories like DeFi, NFTs, tokens, bridges, aggregators, and more, allowing users to easily search for and explore ideas relevant to their interests. This categorization simplifies discovery and enhances user experience.

## User Journey

- Users land on the dashboard and see all ideas fetched from the backend API.
- To submit an idea or upvote an idea, users need to connect their wallet, which results in the creation of a user account in the database.
- Once an idea is submitted, it is added to the database. The database ID is then submitted to the smart contract with a vote count of 0.
- Users can upgrade or edit their ideas, and only database changes are made.
- A backend process can be run to fetch data from the smart contract and update the idea vote count.

**Advance Feature**
- Users can collaborate on a particular idea by creating chat rooms.
- Twitter or Google verification can be used for a verified checkmark.

## Summary
**ShareTos** is more than just an idea-sharing platform; it’s a community where users can bring their ideas to life in a decentralized and collaborative environment. 
Whether you’re contributing a new concept or helping to develop an existing one, ShareTos empowers users to turn ideas into action while engaging with a vibrant community of innovators.
