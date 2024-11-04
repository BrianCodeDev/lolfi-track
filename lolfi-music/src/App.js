import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import song1 from './music/lofi-piano-quotdreamyquot-248626.mp3';
import song2 from './music/lofi-piano-quotmemoriesquot-248627.mp3';
import song3 from './music/lofi-music-5-136397.mp3';
import song4 from './music/lo-fi-podcast-cozy-relaxing-chillout-lounge-music-214440.mp3';
import song5 from './music/valley-of-eternity-zen-yoga-meditation-chillout-study-work-sleep-music-124204.mp3';
import song6 from './music/podcast-lo-fi-music-205515.mp3';
import song7 from './music/scratches-in-wonderland-204115.mp3';
import song8 from './music/1-08. Minecraft.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo } from '@fortawesome/free-solid-svg-icons';

const songs = [
  { title: "Song 1", file: song1 },
  { title: "Song 2", file: song2 },
  { title: "Song 3", file: song3 },
  { title: "Song 4", file: song4 },
  { title: "Song 5", file: song5 },
  { title: "Song 6", file: song6 },
  { title: "Song 7", file: song7 },
  { title: "Song 8", file: song8 }
];

function App() {
  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [volume, setVolume] = useState(1);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedIndex = localStorage.getItem('currentSongIndex');
    const savedTime = localStorage.getItem('currentTime');
    const savedIsPlaying = localStorage.getItem('isPlaying');
    const savedVolume = localStorage.getItem('volume');

    if (savedIndex) setCurrentSongIndex(parseInt(savedIndex));
    if (savedTime) setCurrentTime(parseFloat(savedTime));
    if (savedIsPlaying) setIsPlaying(savedIsPlaying === 'true');
    if (savedVolume) setVolume(parseFloat(savedVolume));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].file;

    // Set the volume and current time when the song loads
    audio.volume = volume;
    audio.currentTime = currentTime;
    
    // Event listeners for audio control
    const handleCanPlayThrough = () => {
      if (isPlaying) {
        audio.play().catch(error => console.error("Error playing the song:", error));
      }
    };

    const handleEnded = () => {
      if (isRepeatOn) {
        audio.currentTime = 0;
        audio.play();
      } else {
        goToNextSong();
      }
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, isPlaying, volume]);

  // Save current state to localStorage on state change or component unmount
  useEffect(() => {
    localStorage.setItem('currentSongIndex', currentSongIndex);
    localStorage.setItem('currentTime', currentTime);
    localStorage.setItem('isPlaying', isPlaying);
    localStorage.setItem('volume', volume);
  }, [currentSongIndex, currentTime, isPlaying, volume]);

  const goToNextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const goToPreviousSong = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const playSongFromList = (index) => {
    if (index !== currentSongIndex) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <main>
          <h2>24/7 Lofi Music Stream</h2>
          <ul className="playlist">
            {songs.map((song, index) => (
              <li key={index} className="song-card">
                <div className="song-info">
                  <span>{song.title}</span>
                </div>
                <button onClick={() => playSongFromList(index)} className="play-button">Play</button>
              </li>
            ))}
          </ul>
        </main>

        <div className="player">
          <div className="controls">
            <button onClick={goToPreviousSong} className="control-button">
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)} className="control-button">
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button onClick={goToNextSong} className="control-button">
              <FontAwesomeIcon icon={faStepForward} />
            </button>
            <button 
              onClick={() => setIsRepeatOn(!isRepeatOn)} 
              className={`control-button ${isRepeatOn ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faRedo} />
            </button>

            <div className="current-song">
              <span>Now Playing: {songs[currentSongIndex].title}</span>
            </div>
          </div>
          <div className="progress-container">
            <span id="current-time">{Math.floor(currentTime)}s</span>
            <input
              id="progress"
              type="range"
              value={currentTime}
              max={duration || 0}
              onChange={(e) => {
                const newTime = e.target.value;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
                setIsPlaying(true); // Auto-play when seeking
              }}
              className="progress-slider"
            />
            <span id="duration">{duration ? Math.floor(duration) + 's' : '0s'}</span>
          </div>
          <div className="volume-control">
            <label htmlFor="volume">Volume:</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                const newVolume = e.target.value;
                setVolume(newVolume);
                audioRef.current.volume = newVolume; // Set audio volume without restarting
              }}
              className="volume-slider"
            />
          </div>
        </div>

        <audio ref={audioRef} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
