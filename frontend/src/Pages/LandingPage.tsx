import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden relative">
    
      <div className="z-10 text-center px-4 w-full">
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-6">
          <motion.div
            initial={{ 
              x: '-200%', 
              scale: 0,
              rotate: -180,
              opacity: 0
            }}
            animate={animate ? { 
              x: 0, 
              scale: 1,
              rotate: 0,
              opacity: 1,
              transition: { 
                type: "spring", 
                stiffness: 150, 
                damping: 10,
                duration: 0.5
              }
            } : {}}
            className="text-white text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter transform-gpu"
          >
            Write
          </motion.div>

          <motion.div
            initial={{ 
              x: '200%', 
              scale: 0,
              rotate: 180,
              opacity: 0
            }}
            animate={animate ? { 
              x: 0, 
              scale: 1,
              rotate: 0,
              opacity: 1,
              transition: { 
                type: "spring", 
                stiffness: 150, 
                damping: 10,
                duration: 0.5
              }
            } : {}}
            className="text-white text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter transform-gpu"
          >
            X
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.6,
              duration: 0.5
            }
          }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-4"
        >
          A New Way to Write Stories: Unleash Your Creativity, Share Your Imagination
        </motion.p>

        {/* Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.8,
              duration: 0.5
            }
          }}
          className="flex justify-center space-x-4 sm:space-x-6 px-4"
        >
          <button 
            onClick={() => navigate('/signin')}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 text-sm sm:text-base"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Sign Up
          </button>
        </motion.div>
      </div>

      {/* Collision Spark */}
      {animate && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 5,
            opacity: 0.6,
            rotate: 360
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: "easeOut"
          }}
          className="absolute w-32 h-32 bg-white/50 rounded-full blur-3xl"
        />
      )}
    </div>
  );
};