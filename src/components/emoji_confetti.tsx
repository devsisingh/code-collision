// @ts-nocheck
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface Particle {
  x: number;
  y: number;
  emoji: string;
  size: number;
  velocity: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
}

interface EmojiConfettiProps {
  ideaId: string;
  onVoteSuccess: () => void; // Add this prop
}

const EmojiConfetti: React.FC<EmojiConfettiProps> = ({
  ideaId,
  onVoteSuccess,
  wallet,
}) => {
  const [isExploding, setIsExploding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  const emojis = ['👍🏽', '❤️'];

  useEffect(() => {
    if (isExploding) {
      const canvas = canvasRef.current;
      const button = buttonRef.current;
      if (!canvas || !button) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);

      const buttonRect = button.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;

      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        particles.current.push({
          x: centerX,
          y: centerY,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: 20 + Math.random() * 20,
          velocity: {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
          },
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }

      const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current = particles.current.filter((particle) => {
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          particle.velocity.y += 0.1; // gravity
          particle.rotation += particle.rotationSpeed;

          if (particle.y < canvas.height) {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.font = `${particle.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.emoji, 0, 0);
            ctx.restore();
            return true;
          }
          return false;
        });

        if (particles.current.length > 0) {
          requestAnimationFrame(animate);
        } else {
          setIsExploding(false);
        }
      };

      animate();

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
      };
    }
  }, [isExploding]);

  const handleClick = () => {
    setIsExploding(true);
    particles.current = [];
  };

  const handleVote = async () => {
    if (!wallet) {
      toast.warn('Please connect your wallet to upvote', {
        position: 'top-right',
      });
      return;
    }

    const token = Cookies.get('access-token'); // Assuming JWT is stored as 'idea_token'
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
  
    try {
      // First, make the API call to your backend to register the vote.
      const res = await fetch(`/api/idea/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ideaId, userId }),
      });
  
      if (res.ok) {
        // If backend API succeeds, proceed to call the Move contract.
        const mintTransaction = {
          arguments: [
            `${ideaId}`,
            '0x8ccc0aaa87309ab8c7f8c1c68e87e33732c03289a289701a3eaf75c78f283579',
          ],
          function:
            '0x8ccc0aaa87309ab8c7f8c1c68e87e33732c03289a289701a3eaf75c78f283579::sharetos::upvote_defi',
          type: 'entry_function_payload',
          type_arguments: [],
        };
  
        const mintResponse = await window.aptos.signAndSubmitTransaction(
          mintTransaction
        );
  
        console.log('Vote transaction done:', mintResponse);
  
        if (mintResponse) {
          // Update vote count in the frontend after successful transaction

          const resp = await fetch(`/api/idea/vote/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ideaId, userId }),
          });

          if(resp.ok){
          onVoteSuccess();
          toast.success('Vote recorded successfully!');
        }
        }
      } else {
        toast.error('Failed to register vote. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      toast.error('An error occurred while voting. Please try again later.');
      console.error('Error voting:', error);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        className="text-md transform-gpu rounded-lg px-6 py-2 font-semibold"
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!wallet) {
            toast.warn('Please connect your wallet to upvote', {
              position: 'top-right',
            });
          } else {
            handleClick();
            handleVote();
          }
        }}
        disabled={loading} // Disable the button while loading
        style={{
          fontSize: '14px',
          backgroundColor: '#EABF9F',
          color: '#A35709',
        }}
      >
        {loading ? 'Voting...' : 'Vote 👍🏽'}
      </motion.button>
      {isExploding && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0"
          style={{ zIndex: 9999 }}
        />
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmojiConfetti;
