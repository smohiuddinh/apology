import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, CloudRain } from 'lucide-react';

export default function ApologyForKashuf() {
  const [stage, setStage] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    if (showHearts) {
      const hearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      }));
      setFloatingHearts(hearts);
    }
  }, [showHearts]);

  const handleAccept = () => {
    setAccepted(true);
    setShowHearts(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Quicksand:wght@400;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes heartFloat {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .float { animation: float 3s ease-in-out infinite; }
        .bounce { animation: bounce 1s ease-in-out infinite; }
        .wiggle { animation: wiggle 0.5s ease-in-out infinite; }
        .sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        .slide-in { animation: slideIn 0.6s ease-out forwards; }
        
        .heart-float {
          animation: heartFloat var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
        
        .handwritten {
          font-family: 'Caveat', cursive;
          line-height: 1.4;
        }
        
        .soft-shadow {
          box-shadow: 0 10px 40px rgba(219, 39, 119, 0.15);
        }
        
        .glow {
          box-shadow: 0 0 20px rgba(219, 39, 119, 0.3);
        }
        
        .message-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 242, 247, 0.9) 100%);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(219, 39, 119, 0.1);
        }
      `}</style>

      {/* Floating hearts background */}
      {showHearts && floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="heart-float absolute text-pink-500 opacity-70"
          style={{
            left: `${heart.left}%`,
            '--delay': `${heart.delay}s`,
            '--duration': `${heart.duration}s`,
            fontSize: '24px'
          }}
        >
          ♥
        </div>
      ))}

      {/* Decorative clouds */}
      <div className="absolute top-10 left-10 opacity-30 float">
        <div className="text-6xl">☁️</div>
      </div>
      <div className="absolute top-20 right-20 opacity-30 float" style={{ animationDelay: '1s' }}>
        <div className="text-5xl">☁️</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8 slide-in">
            <div className="inline-block mb-4">
              <div className="text-8xl mb-2 bounce">🐰</div>
              <Sparkles className="w-8 h-8 text-yellow-500 sparkle inline-block" />
            </div>
            <h1 className="handwritten text-6xl md:text-7xl text-pink-600 mb-2">
              Dear Kashuf...
            </h1>
            <p className="text-gray-600 font-['Quicksand'] text-lg">
              From your friend who messed up
            </p>
          </div>

          {/* Main message card */}
          <div className="message-card rounded-3xl p-8 md:p-12 soft-shadow mb-6 slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6 font-['Quicksand']">
              {stage >= 0 && (
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed slide-in">
                  I'm really sorry for being so Toxic...  <span className="font-bold text-pink-600 handwritten text-3xl">Kashuf</span>. 
                </p>
              )}
              
              {stage >= 1 && (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed slide-in" style={{ animationDelay: '0.4s' }}>
                  You're my best friend, and you deserve to be respected and i truly value you! I promise to do better! 💕
                </p>
              )}
              
              {stage >= 2 && (
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 slide-in" style={{ animationDelay: '0.6s' }}>
                  <p className="handwritten text-2xl md:text-3xl text-pink-700 text-center">
                    "Kashuf, you mean the world to me!"
                  </p>
                </div>
              )}
              
              {stage >= 3 && !accepted && (
                <div className="text-center space-y-4 slide-in" style={{ animationDelay: '0.8s' }}>
                  <p className="text-lg text-gray-700">
                    Can you forgive me? 🥺
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={handleAccept}
                      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-110 transition-transform soft-shadow hover:glow"
                    >
                      <Heart className="inline-block mr-2 w-5 h-5" />
                      Yes, I forgive you!
                    </button>
                    <button
                      onClick={() => setStage(2)}
                      className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-pink-300 hover:bg-pink-50 transition-all"
                    >
                      <CloudRain className="inline-block mr-2 w-5 h-5" />
                      Not yet...
                    </button>
                  </div>
                </div>
              )}
              
              {accepted && (
                <div className="text-center space-y-6 slide-in">
                  <div className="text-6xl mb-4">🎉✨🎊</div>
                  <p className="handwritten text-4xl md:text-5xl text-pink-600">
                    Thank you, Kashuf!
                  </p>
                  <p className="text-xl text-gray-700">
                    You're the best friend anyone could ask for! 💖
                  </p>
                  <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 mt-6">
                    <p className="text-lg text-gray-800 leading-relaxed">
                      I i'll not do it again from now on. 
                      <span className="font-bold text-pink-600"> Kashuf </span> 
                      is a beautiful name for a beautiful person! 🌟
                    </p>
                  </div>
                </div>
              )}
              
              {stage < 3 && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setStage(stage + 1)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                  >
                    Continue reading... ✨
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer message */}
          <div className="text-center slide-in" style={{ animationDelay: '1s' }}>
            <p className="text-gray-600 font-['Quicksand'] text-sm">
              Made with 💝 and lots of apologies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}