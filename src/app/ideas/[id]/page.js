'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import EmojiConfetti from '@/components/emoji_confetti';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const IdeaPage = ({ params }) => {
  const id = params?.id;

  const [wallet, setwallet] = useState('');
  const [idea, setIdea] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setloading] = useState(false);

  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!wallet) {
      toast.warn('Please connect your wallet to comment on idea.', {
        position: 'top-right',
      });
      return;
    }

    if (!commentContent) return; // Do nothing if comment is empty

    setIsSubmitting(true);

    const token = Cookies.get('access-token'); // Assuming JWT is stored as 'idea_token'
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentContent,
          ideaId: id,
          userId: userId,
        }),
      });

      if (response.ok) {
        setCommentContent('');
        await fetchIdeaAfterComment();
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchIdeaAfterComment = async () => {
    try {
      const res = await fetch(`/api/idea/${id}`);
      const data = await res.json();
      setIdea(data.idea);
      setComments(data.comments);
      console.log('ideas fetch', data);
    } catch (err) {
      console.error('Failed to fetch ideas:', err);
    }
  };

  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get('idea_wallet');
      setwallet(loggedin);
    };
    call();
  }, []);

  const fetchIdea = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/idea/${id}`);
      const data = await res.json();
      setIdea(data.idea);
      setComments(data.comments);
      console.log('ideas fetch', data);
      setloading(false);
    } catch (err) {
      console.error('Failed to fetch ideas:', err);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchIdea();
  }, [id]);

  return (
    <>
      <div
        className="px-10 py-10 min-h-[91vh] w-full"
        style={{ background: 'radial-gradient(circle, #000000 , #000000)' }}
      >
        <div className="flex lg:flex-row md:flex-row flex-col gap-6">
          <div
            className="lg:w-4/5 md:w-4/5 w-full border border-gray-500 rounded-xl"
            style={{
              boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              background:
                    'radial-gradient(circle at top left, #0b262e 10%, #051418 65%, #78aba6)',
                  transition: 'background 0.5s ease-out',
            }}
          >
            <div className="flex flex-row gap-4">
              <div
                className="relative p-10 rounded-xl w-full"
              >
                <div className="text-white text-3xl font-semibold mb-10 capitalize">
                  {idea?.title}
                </div>

                <div className="flex justify-between text-white items-center">
                  <div
                    className={
                      'bg-[#1D4E4F] text-white font-bold text-xs p-2 rounded-lg'
                    }
                  >
                    {idea?.userId}
                  </div>
                  <div
                    className="px-2 py-1 rounded -mt-2 capitalize"
                    style={{ fontSize: '15px' }}
                  >
                    <span
                      className={
                        'inline-block bg-[#1D4E4F] text-white font-bold text-xs p-2 rounded-lg'
                      }
                    >
                      Category
                    </span>{' '}
                    :{idea?.category}
                  </div>

                  <div
                    className="px-2 py-1 rounded -mt-2 flex items-center gap-3"
                    style={{
                      fontSize: '15px',
                      color: '#FFCAD4',
                    }}
                  >
                    <div className={'flex'}>
                      <span className={'mr-1'}>❤️</span>
                      {idea?.vote_count}
                    </div>

                    <EmojiConfetti
                      ideaId={id}
                      onVoteSuccess={fetchIdea}
                      wallet={wallet}
                    />
                  </div>
                </div>

                <div className="text-white text-xl mt-16 font-bold">
                  Problem Solve:
                </div>
                <div className="text-gray-300 text-md mt-4 text-[18px]">
                  {idea?.problem_solved}
                </div>

                <div className="text-white text-xl mt-10 font-bold">
                  Possible Solution:
                </div>
                <div className="text-gray-300 text-md mt-4 text-[18px]">
                  {idea?.possible_solution}
                </div>

                <div className="text-white text-xl mt-10 font-bold">
                  Resources:
                </div>
                <div className="text-gray-300 text-md mt-4 text-[18px]">
                  {idea?.resources?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {idea.resources.map((resource, index) => (
                        <li key={index} className="mt-2">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No resources available.</p>
                  )}
                </div>

                <div className="text-white text-xl mt-10 font-bold">
                  Additional:
                </div>
                <div className="text-gray-300 text-md mt-4 text-[18px]">
                  {idea?.additional}
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:w-2/5 md:w-2/5 w-full border border-gray-500 rounded-xl h-[85vh]"
            style={{
              boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="text-center text-white text-lg py-4 border-b">
              Comments
            </div>

            <div className="flex-1 overflow-auto p-4">
  {comments?.length > 0 ? (
    comments.map((comment, idx) => (
      <div
        className={`flex mb-3 relative ${
          comment.user.wallet_address === wallet ? 'justify-end' : 'justify-start'
        }`}
        key={idx}
      >
        {/* Comment Box */}
        <div
          className={`p-3 rounded-xl relative max-w-xs break-words ${
            comment.user.wallet_address === wallet ? 'text-right bg-gray-600' : 'text-left bg-gray-700'
          }`}
        >
          {/* Triangle Pointer */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              comment.user.wallet_address === wallet ? 'right-[-10px]' : 'left-[-10px]'
            }`}
          >
            <div
              className={`w-0 h-0 border-solid border-t-[10px] border-b-[10px] ${
                comment.user.wallet_address === wallet
                  ? 'border-l-[10px] border-l-gray-600 border-t-transparent border-b-transparent'
                  : 'border-r-[10px] border-r-gray-700 border-t-transparent border-b-transparent'
              }`}
            ></div>
          </div>

          {/* Wallet Address for other users */}
          {comment.user.wallet_address !== wallet && (
            <div className="text-gray-400 text-xs font-bold mb-1 cursor-pointer" title={comment.user.wallet_address}>
              {comment.user.wallet_address.substring(0, 5)}...
            </div>
          )}

          {/* Comment Content */}
          <p className="text-white">{comment.content}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="p-4 text-center text-white">No comments yet. Be the first to add one!</div>
  )}
</div>

            <div className="">
                <textarea
                  className="w-full p-2 border border-gray-600 bg-black text-white focus:outline-none focus:border-none focus:ring-1 focus:ring-gray-600"
                  rows="2"
                  value={commentContent}
                  onChange={handleCommentChange}
                  placeholder="Add a comment..."
                />
                <button
                  className={`w-full p-3 -mt-2 bg-gradient-to-r from-[#539b82] to-[#aba564] text-white rounded-b-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleCommentSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Add Comment'}
                </button>
            </div>
          </div>

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
    </>
  );
};

export default IdeaPage;
