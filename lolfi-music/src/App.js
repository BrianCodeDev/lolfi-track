// src/App.js
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

const songs = [
  { title: "Song 1", file: song1 },
  { title: "Song 2", file: song2 },
  { title: "Song 3", file: song3 },
  { title: "Song 4", file: song4 },
  { title: "Song 5", file: song5 },
  { title: "Song 6", file: song6 },
  { title: "Song 7", file: song7 }
];

function App() {
  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].file;

    const playMusic = () => {
      audio.play().catch(error => console.error("Error playing the song:", error));
    };

    const handleSongEnd = () => {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
    };

    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(error => console.error("Error playing:", error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playSongFromList = (index) => {
    if (index !== currentSongIndex) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const goToNextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const goToPreviousSong = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
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
              onChange={handleProgressChange}
              className="progress-slider"
            />
            <span id="duration">{duration ? Math.floor(duration) + 's' : '0s'}</span>
          </div>
        </div>

        <audio ref={audioRef} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
