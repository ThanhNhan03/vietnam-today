import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Vinyl from './Vinyl';
import VinylSleeve from './VinylSleeve';

interface Episode {
  id: number;
  title: string;
  duration: number;
  audioUrl: string;
  imageUrl: string;
}

interface TurntableProps {
  episodes: Episode[];
  currentEpisodeIndex: number;
  onEpisodeChange: (index: number) => void;
  onPlayingChange: (isPlaying: boolean) => void;
  isPlaying: boolean;
}

const Turntable: React.FC<TurntableProps> = ({ 
  episodes,
  currentEpisodeIndex,
  onEpisodeChange,
  onPlayingChange,
  isPlaying 
}) => {
  const [isChangingVinyl, setIsChangingVinyl] = useState(false);
  const [showSleeve, setShowSleeve] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [actualIsPlaying, setActualIsPlaying] = useState(false);
  
  const currentEpisode = episodes[currentEpisodeIndex];

  // Update progress bar continuously
  const updateProgress = () => {
    if (soundRef.current) {
      const seek = soundRef.current.seek() || 0;
      const totalDuration = soundRef.current.duration() || 0;
      const isCurrentlyPlaying = soundRef.current.playing();
      
      setCurrentTime(seek);
      setDuration(totalDuration);
      setProgress(totalDuration > 0 ? (seek / totalDuration) * 100 : 0);
      setActualIsPlaying(isCurrentlyPlaying);
      
      // Sync parent state with actual audio state
      if (isCurrentlyPlaying !== isPlaying) {
        onPlayingChange(isCurrentlyPlaying);
      }

      if (isCurrentlyPlaying) {
        requestAnimationFrame(updateProgress);
      }
    }
  };

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
        const totalDuration = soundRef.current?.duration() || 0;
        setDuration(totalDuration);
      },
      onplay: () => {
        setActualIsPlaying(true);
        onPlayingChange(true);
        updateProgress();
      },
      onpause: () => {
        setActualIsPlaying(false);
        onPlayingChange(false);
      },
      onstop: () => {
        setActualIsPlaying(false);
        onPlayingChange(false);
        setCurrentTime(0);
        setProgress(0);
      },
      onend: () => {
        setActualIsPlaying(false);
        // Auto-play next episode
        if (currentEpisodeIndex < episodes.length - 1) {
          onEpisodeChange(currentEpisodeIndex + 1);
        } else {
          onPlayingChange(false);
          setCurrentTime(0);
          setProgress(0);
        }
      },
      onseek: () => {
        updateProgress();
      },
      onloaderror: (id, error) => {
        console.error('Audio load error:', error);
        setActualIsPlaying(false);
        onPlayingChange(false);
      },
      onplayerror: (id, error) => {
        console.error('Audio play error:', error);
        setActualIsPlaying(false);
        onPlayingChange(false);
      }
    });

    // Reset states when changing episodes
    setCurrentTime(0);
    setProgress(0);
    setActualIsPlaying(false);

    return () => {
      soundRef.current?.unload();
    };
  }, [currentEpisode.audioUrl, currentEpisodeIndex, episodes.length, onEpisodeChange, onPlayingChange]);

  // Sync with external isPlaying changes (but prioritize actual audio state)
  useEffect(() => {
    if (soundRef.current) {
      const isCurrentlyPlaying = soundRef.current.playing();
      
      if (isPlaying && !isCurrentlyPlaying) {
        soundRef.current.play();
      } else if (!isPlaying && isCurrentlyPlaying) {
        soundRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Trigger vinyl change animation when episode changes
    setIsChangingVinyl(true);
    setShowSleeve(true);
    
    const hideSleeveTimer = setTimeout(() => setShowSleeve(false), 2500);
    const resetChangeTimer = setTimeout(() => setIsChangingVinyl(false), 1200);
    
    return () => {
      clearTimeout(hideSleeveTimer);
      clearTimeout(resetChangeTimer);
    };
  }, [currentEpisode.id]);

  const togglePlay = () => {
    if (soundRef.current) {
      const isCurrentlyPlaying = soundRef.current.playing();
      
      if (isCurrentlyPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
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
    if (soundRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
      setProgress(percent * 100);
      
      // Continue playing if it was playing
      if (actualIsPlaying) {
        updateProgress();
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="turntable">
      {/* Turntable Base */}
      <motion.div
        className={`turntable-base ${actualIsPlaying ? 'playing' : ''}`}
        animate={{
          boxShadow: actualIsPlaying
            ? '0 0 20px rgba(211, 47, 47, 0.2)'
            : '0 20px 60px rgba(0, 0, 0, 0.9)',
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Vinyl Container with Tone Arm */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>

          {/* Vinyl Disk with change animation */}
          <div style={{ position: 'relative', perspective: '1000px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEpisode.id}
                initial={{ 
                  x: 400, 
                  rotateY: 60,
                  opacity: 0,
                  scale: 0.6
                }}
                animate={{ 
                  x: 0, 
                  rotateY: 0,
                  opacity: 1,
                  scale: 1
                }}
                exit={{ 
                  x: -400, 
                  rotateY: -60,
                  opacity: 0,
                  scale: 0.6
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <Vinyl isPlaying={actualIsPlaying && !isChangingVinyl} imageUrl={currentEpisode.imageUrl} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vinyl Sleeve - appears when changing vinyl */}
          <VinylSleeve imageUrl={currentEpisode.imageUrl} isVisible={showSleeve} />
        </div>

        {/* Player Controls Section */}
        <div style={{ marginTop: '2rem' }}>
          {/* Episode Title */}
          <motion.h3
            className={`player-title ${actualIsPlaying ? 'playing' : ''}`}
            animate={{ color: actualIsPlaying ? '#D32F2F' : '#FFFFFF' }}
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
                className={`progress-bar ${actualIsPlaying ? 'playing' : ''}`}
                style={{ width: `${progress}%` }}
                animate={{
                  boxShadow: actualIsPlaying ? '0 0 10px rgba(211, 47, 47, 0.8)' : 'none',
                }}
              />
            </motion.div>

            {/* Time Display */}
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || currentEpisode.duration)}</span>
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
                boxShadow: actualIsPlaying
                  ? '0 0 20px rgba(211, 47, 47, 0.8)'
                  : '0 0 10px rgba(211, 47, 47, 0.3)',
              }}
            >
              {actualIsPlaying ? <Pause size={32} /> : <Play size={32} />}
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
        </div>

        {/* Control panel (bottom) */}
        <div className="turntable-controls">
          <div>33 RPM</div>
          <div>45 RPM</div>
          <div>78 RPM</div>
        </div>
      </motion.div>

      {/* Decorative shadow */}
      <div className="turntable-shadow" />
    </div>
  );
};

export default Turntable;
