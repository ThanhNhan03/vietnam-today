import React from 'react';
import { motion } from 'framer-motion';

interface Episode {
  id: number;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  releaseDate: string;
}

interface EpisodeSelectorProps {
  episodes: Episode[];
  currentIndex: number;
  onSelect: (index: number) => void;
  isPlaying: boolean;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  episodes,
  currentIndex,
  onSelect,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="episode-selector"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* <h2 className="episode-list-title">Chọn đĩa nhạc ở đây</h2> */}

      <div className="vinyl-stack">
        {episodes.map((episode, index) => {
          const isActive = currentIndex === index;
          
          return (
            <motion.button
              key={episode.id}
              onClick={() => onSelect(index)}
              variants={itemVariants}
              whileHover={{ 
                x: isActive ? 0 : 20,
                scale: isActive ? 1 : 1.05,
              }}
              whileTap={{ 
                x: 30,
                scale: 0.95,
              }}
              className={`vinyl-item ${isActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                zIndex: episodes.length - index,
              }}
            >
              {/* Vinyl disk edge (cạnh đĩa nhìn từ bên) */}
              <div className="vinyl-edge">
                {/* Grooves on edge */}
                <div className="vinyl-edge-grooves" />
              </div>

              {/* Album cover - square shape */}
              <div className="vinyl-cover">
                <img src={episode.imageUrl} alt={episode.title} />
              </div>

              {/* Episode info tooltip */}
              <div className="vinyl-info-tooltip">
                <h4>{episode.title}</h4>
                <p>{Math.floor(episode.duration / 60)} phút</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EpisodeSelector;
