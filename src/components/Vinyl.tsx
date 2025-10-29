import React from 'react';
import { motion } from 'framer-motion';

interface VinylProps {
  isPlaying: boolean;
  imageUrl: string;
}

const Vinyl: React.FC<VinylProps> = ({ isPlaying, imageUrl }) => {
  return (
    <div className="vinyl">
      <motion.div
        className="vinyl-disk"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: 'linear',
        }}
      >
        {/* Black vinyl background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 30%, #1a1a1a 0%, #000000 60%)',
          borderRadius: '50%',
        }} />

        {/* Grooves effect - multiple concentric circles */}
        <svg className="vinyl-grooves" viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="vinylShine">
              <stop offset="0%" stopColor="#333" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          {/* Multiple groove circles */}
          {[...Array(30)].map((_, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={95 - i * 3}
              fill="none"
              stroke="#222"
              strokeWidth="0.3"
              opacity={0.4}
            />
          ))}
        </svg>

        {/* Reflective shine effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Center label area with album art */}
        <div className="vinyl-center">
          <img src={imageUrl} alt="Album Art" />
        </div>

        {/* Center hole */}
        <div className="vinyl-hole"></div>
      </motion.div>

      {/* Gloss/shine effect on vinyl when playing */}
      {isPlaying && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
          animate={{
            boxShadow: [
              'inset 0 0 30px rgba(211, 47, 47, 0.15), 0 0 40px rgba(211, 47, 47, 0.1)',
              'inset 0 0 40px rgba(211, 47, 47, 0.25), 0 0 50px rgba(211, 47, 47, 0.2)',
              'inset 0 0 30px rgba(211, 47, 47, 0.15), 0 0 40px rgba(211, 47, 47, 0.1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default Vinyl;
