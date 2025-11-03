import { useState } from 'react';
import { motion } from 'framer-motion';
import Turntable from './components/Turntable';
import EpisodeSelector from './components/EpisodeSelector';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import podcastData from './data/podcasts.json';
import './App.css';

function App() {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('podcast');

  const currentEpisode = podcastData[currentEpisodeIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="podcast-container">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Animated background glow */}
      {isPlaying && (
        <motion.div
          style={{
            position: 'fixed',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24rem',
            height: '24rem',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(211, 47, 47, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      {/* Main content */}
      <motion.div
        key={currentPage}
        className="podcast-content fade-in"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentPage === 'podcast' && (
          <>
            {/* Header */}
            <motion.div className="podcast-header" variants={itemVariants}>
              <h1 className="podcast-title">Nghe Việt Nam Thay Đổi</h1>
              <p className="podcast-tagline">
                "Chọn đĩa. Lên kim. Và để Việt Nam kể câu chuyện của chính mình."
              </p>
            </motion.div>

            {/* Main Layout */}
            <div className="podcast-layout">
              {/* Left: Episode Selector */}
              <motion.div variants={itemVariants}>
                <EpisodeSelector
                  episodes={podcastData}
                  currentIndex={currentEpisodeIndex}
                  onSelect={setCurrentEpisodeIndex}
                  isPlaying={isPlaying}
                />
              </motion.div>

              {/* Center: Turntable with Player */}
              <motion.div variants={itemVariants} className="turntable card">
                <Turntable 
                  episodes={podcastData}
                  currentEpisodeIndex={currentEpisodeIndex}
                  onEpisodeChange={setCurrentEpisodeIndex}
                  onPlayingChange={setIsPlaying}
                  isPlaying={isPlaying}
                />
              </motion.div>

              {/* Right: Episode Content */}
              <motion.div variants={itemVariants} className="episode-content card">
                <h3 className="episode-content-title">Nội dung chính</h3>
                <div className="episode-content-body">
                  <h2>{currentEpisode.title}</h2>
                  <p className="episode-description">{currentEpisode.description}</p>
                  <div className="episode-metadata">
                    <div className="metadata-item">
                      <span className="label">Thời lượng:</span>
                      <span className="value">{Math.floor(currentEpisode.duration / 60)} phút</span>
                    </div>
                    <div className="metadata-item">
                      <span className="label">Phát hành:</span>
                      <span className="value">{new Date(currentEpisode.releaseDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Info */}
            <motion.div className="podcast-footer" variants={itemVariants}>
              <p>
                © 2025 Nghe Việt Nam Thay Đổi • Podcast Podcast • Mục sử dụng âm thanh từ SoundHelix
              </p>
            </motion.div>
          </>
        )}

        {currentPage === 'content' && (
          <Timeline />
        )}

        {currentPage === 'qa' && (
          <motion.div variants={itemVariants} className="page-placeholder">
            <h1>Q&A</h1>
            <p>Trang này đang trong quá trình phát triển...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
