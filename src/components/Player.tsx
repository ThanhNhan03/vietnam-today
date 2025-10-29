import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlayerProps {
  episodes: Array<{
    id: number;
    title: string;
    duration: number;
    audioUrl: string;
  }>;
  currentEpisodeIndex: number;
  onEpisodeChange: (index: number) => void;
  onPlayingChange: (isPlaying: boolean) => void;
  isPlaying: boolean;
}

const Player: React.FC<PlayerProps> = ({
  episodes,
  currentEpisodeIndex,
  onEpisodeChange,
  onPlayingChange,
  isPlaying,
}) => {
  const soundRef = useRef<Howl | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const currentEpisode = episodes[currentEpisodeIndex];

  // Initialize Howler instance
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [currentEpisode.audioUrl],
      html5: true,
      preload: 'metadata',
      onload: () => {
        // Loaded
      },
      onplay: () => {
        onPlayingChange(true);
        updateProgress();
      },
      onpause: () => {
        onPlayingChange(false);
      },
      onstop: () => {
        onPlayingChange(false);
        setCurrentTime(0);
        setProgress(0);
      },
      onend: () => {
        // Auto-play next episode
        if (currentEpisodeIndex < episodes.length - 1) {
          onEpisodeChange(currentEpisodeIndex + 1);
        } else {
          onPlayingChange(false);
          setCurrentTime(0);
          setProgress(0);
        }
      },
    });
  }, [currentEpisode.audioUrl, currentEpisodeIndex, episodes.length, onEpisodeChange, onPlayingChange]);

  // Update progress bar
  const updateProgress = () => {
    if (soundRef.current) {
      const seek = soundRef.current.seek();
      const duration = soundRef.current.duration();
      setCurrentTime(seek);
      setProgress((seek / duration) * 100);

      if (soundRef.current.playing()) {
        requestAnimationFrame(updateProgress);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      soundRef.current?.play();
      updateProgress();
    } else {
      soundRef.current?.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      soundRef.current?.pause();
      onPlayingChange(false);
    } else {
      soundRef.current?.play();
      onPlayingChange(true);
    }
  };

  const handlePrevious = () => {
    if (currentEpisodeIndex > 0) {
      onEpisodeChange(currentEpisodeIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      onEpisodeChange(currentEpisodeIndex + 1);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (soundRef.current && soundRef.current.duration()) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * soundRef.current.duration();
      soundRef.current.seek(newTime);
      setProgress(percent * 100);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
      {/* Player Card */}
      <motion.div
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
          border: '1px solid #374151',
          borderRadius: '1rem',
          padding: '1.5rem',
        }}
        animate={{
          boxShadow: isPlaying
            ? '0 0 30px rgba(211, 47, 47, 0.3)'
            : '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Episode Title */}
        <motion.h3
          className={`player-title ${isPlaying ? 'playing' : ''}`}
          animate={{ color: isPlaying ? '#D32F2F' : '#FFFFFF' }}
          transition={{ duration: 0.3 }}
        >
          {currentEpisode.title}
        </motion.h3>

        {/* Progress Bar */}
        <div className="progress-container">
          <motion.div
            className="progress-bar-wrapper"
            onClick={handleProgressClick}
          >
            <motion.div
              className={`progress-bar ${isPlaying ? 'playing' : ''}`}
              style={{ width: `${progress}%` }}
              animate={{
                boxShadow: isPlaying ? '0 0 10px rgba(211, 47, 47, 0.8)' : 'none',
              }}
            />
          </motion.div>

          {/* Time Display */}
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentEpisode.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="player-controls">
          <motion.button
            onClick={handlePrevious}
            className="control-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentEpisodeIndex === 0}
          >
            <SkipBack size={24} />
          </motion.button>

          <motion.button
            onClick={togglePlay}
            className="play-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isPlaying
                ? '0 0 20px rgba(211, 47, 47, 0.8)'
                : '0 0 10px rgba(211, 47, 47, 0.3)',
            }}
          >
            {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="control-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentEpisodeIndex === episodes.length - 1}
          >
            <SkipForward size={24} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Player;
