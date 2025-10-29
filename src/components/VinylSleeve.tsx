import React from 'react';
import { motion } from 'framer-motion';

interface VinylSleeveProps {
  imageUrl: string;
  isVisible: boolean;
}

const VinylSleeve: React.FC<VinylSleeveProps> = ({ imageUrl, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 50,
      }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        bottom: '-4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '12rem',
        height: '12rem',
        perspective: '1000px',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
    </motion.div>
  );
};

export default VinylSleeve;
