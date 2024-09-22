'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { FaLightbulb, FaComments, FaThumbsUp, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import EditForm from '@/components/Editform'

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setloading] = useState(true);
  const [ideas, setIdeas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIdea, setCurrentIdea] = useState(null);

  const handleEditClick = (idea) => {
    setCurrentIdea(idea);
    setIsEditing(true);
  };


  const router = useRouter();

  useEffect(() => {
    const getProfile = () => {
      const token = Cookies.get('access-token'); // Assuming JWT is stored as 'idea_token'
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setProfileDetails(decodedToken);
    };
    getProfile();
  }, []);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/idea?userId=${profileDetails.userId}`);
        const data = await res.json();
        setIdeas(data.ideas);
        console.log('ideas fetch', data);
        setloading(false);
      } catch (err) {
        console.error('Failed to fetch ideas:', err);
        setloading(false);
      }
    };

    fetchIdeas();
  }, [profileDetails]);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error('Failed to copy text!', {
          position: 'top-right',
          autoClose: 2000,
        });
        console.error('Failed to copy text: ', err);
      });
  };

  // Function to partially hide the id or wallet
  const shortenText = (text) => {
    if (!text) return '';
    return `${text.slice(0, 6)}...${text.slice(-4)}`;
  };

  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const { clientX, clientY } = e;
    const { left, top, width, height } = target.getBoundingClientRect();
    const xPercent = ((clientX - left) / width) * 100;
    const yPercent = ((clientY - top) / height) * 100;

    target.style.background = `radial-gradient(circle at top, #061419, transparent), radial-gradient(circle at ${xPercent}% ${yPercent}%, #061419, transparent)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background =
      'radial-gradient(circle at top, #032428, transparent)';
  };


  const handleSave = async (updatedIdea) => {
    try {
      const response = await fetch(`/api/idea/${updatedIdea.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedIdea.title,
          problem_solved: updatedIdea.description1,
          possible_solution: updatedIdea.description2,
          resources: updatedIdea.description3,
          additional: updatedIdea.description4,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the idea");
      }
  
      const updatedIdeaFromAPI = await response.json();
      
      setIdeas((prevIdeas) => {
        const updatedIdeas = prevIdeas.map((idea) =>
          idea.id === updatedIdea.id ? updatedIdeaFromAPI.idea : idea
        );
        
        // Log the updated ideas array
        console.log("Updated Ideas:", updatedIdeas);
  
        return updatedIdeas;
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };
  

  return (
    <div className="mx-20 min-h-screen w-full">
      <div className="flex text-white gap-10 mt-10">
        <div className="relative w-full">
          <img
            src="https://www.defineinternational.com/wp-content/uploads/2014/06/dummy-profile.png"
            className="rounded-full w-40 h-40"
            alt="Profile"
          />

          {/* Position the userId and wallet_address at the bottom of the image */}
          <div className="absolute top-20 left-40 w-auto">
            <div className="flex justify-start items-start gap-2 ">
              <div>User ID:</div>
              <div>{shortenText(profileDetails.userId)}</div>
              <FaCopy
                className="cursor-pointer"
                onClick={() => copyToClipboard(profileDetails.userId)}
                title="Copy User ID"
              />
            </div>

            <div className="flex justify-start items-start gap-2 mt-2">
              <div>Wallet Address:</div>
              <div>{shortenText(profileDetails.wallet_address)}</div>
              <FaCopy
                className="cursor-pointer"
                onClick={() => copyToClipboard(profileDetails.wallet_address)}
                title="Copy Wallet Address"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-[164px] pt-[27px] relative  pl-[20px] h-[167px] rounded-[12px] bg-gradient-to-b from-[#000000] to-[#10434a] border border-white/[0.2]">
            <h6 className="text-white  w-max  semiBold text-[14px] leading-normal ">
              Total Ideas
            </h6>
            <div className="flex items-center absolute bottom-[37px] h-max gap-[19px]">
              <FaLightbulb style={{ width: '30px', height: '30px' }} />
              <p className="text-[42px]  leading-tight Graph-normal">{10}</p>
            </div>
          </div>

          {/* <div className="w-[164px] pt-[27px] relative  pl-[20px] h-[167px] rounded-[12px] bg-gradient-to-b from-[#000000] to-[#10434a] border border-white/[0.2]">
            <h6 className="text-white  w-max  semiBold text-[14px] leading-normal ">
              Total Chat
            </h6>
            <div className="flex items-center absolute bottom-[37px] h-max gap-[19px]">
              <FaComments style={{ width: '30px', height: '30px' }} />
              <p className="text-[42px]  leading-tight Graph-normal">{10}</p>
            </div>
          </div> */}

          <div className="w-[164px] pt-[27px] relative  pl-[20px] h-[167px] rounded-[12px] bg-gradient-to-b from-[#000000] to-[#10434a] border border-white/[0.2]">
            <h6 className="text-white  w-max  semiBold text-[14px] leading-normal ">
              Total Votes
            </h6>
            <div className="flex items-center absolute bottom-[37px] h-max gap-[19px]">
              <FaThumbsUp style={{ width: '30px', height: '30px' }} />
              <p className="text-[42px]  leading-tight Graph-normal">{10}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-3xl text-white font-bold mt-20">My Ideas</div>

      <div className="my-10 grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4">
        {ideas?.map((idea) => (
          <div
            key={idea.id}
            className="flex flex-col  justify-between relative cursor-pointer p-6 border-white/[0.2] border rounded-xl "
            style={{
              background:
                'radial-gradient(circle at top, #032428, transparent)',
              transition: 'background 0.5s ease-out',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // onClick={() => router.push(`/ideas/${idea.id}`)}
          >
            <div>
              <div className="text-white text-xl font-semibold mb-4 capitalize">
                {idea?.title}
              </div>

              <div className="text-gray-300 text-sm my-6">
                <span className="font-bold">
                  {idea?.problem_solved?.length > 100
                    ? idea.problem_solved.substring(0, 100) + '...'
                    : idea.problem_solved}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-white items-center">
              <div className="flex gap-4 items-center">
                <div
                  style={{
                    fontSize: '15px',
                    color: '#FFCAD4',
                    marginTop: '3px',
                  }}
                >
                  <span className={'mr-1'}>❤️</span> {idea?.vote_count}
                </div>
                {/* <div
                  className="capitalize px-2 py-1 rounded-lg text-center text-[14px] bg-green-100 z-[10] text-green-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!wallet) {
                      toast.warn('Please connect your wallet to upvote', {
                        position: 'top-right',
                      });
                    } else {
                      handleVote(idea.id);
                    }
                  }}
                >
                  Vote 👍
                </div> */}

                <div
                  className="capitalize px-6 py-1 rounded-lg text-center text-[14px] bg-green-100 z-[10] text-green-800"
                  onClick={() => handleEditClick(idea)}
                >
                  Edit
                </div>
              </div>
              <div
                className="px-4 py-1.5 rounded-lg text-center bg-white text-black font-bold"
                style={{ fontSize: '13px' }}
              >
                {idea.category}
              </div>
            </div>
          </div>
        ))}

        {isEditing && (
      <EditForm
        idea={currentIdea}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    )}

        {loading && (
          <div
            style={{ backgroundColor: '#222944E5' }}
            className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
            id="popupmodal"
          >
            <div className="relative p-4 w-full max-h-full">
              <div className="relative rounded-lg">
                <div className="flex justify-center gap-4">
                  <img
                    src="/smallloader.gif"
                    alt="Loading icon"
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
