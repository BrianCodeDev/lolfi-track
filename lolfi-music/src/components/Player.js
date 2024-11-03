// src/components/Player.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faForward } from '@fortawesome/free-solid-svg-icons';

const Player = () => {
  return (
    <div className="player">
      <audio id="audio">
        <source id="audio-source" src="your-audio-file.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="controls">
        <button id="prev"><FontAwesomeIcon icon={faBackward} /></button>
        <button id="play"><FontAwesomeIcon icon={faPlay} /></button>
        <button id="next"><FontAwesomeIcon icon={faForward} /></button>
      </div>
      <div className="progress-container">
        <span id="current-time">0:00</span>
        <input type="range" id="progress" value="0" step="0.1" min="0" max="100" />
        <span id="duration">0:00</span>
      </div>
      <div className="volume-container">
        <label htmlFor="volume">Volume:</label>
        <input type="range" id="volume" value="100" step="1" min="0" max="100" />
      </div>
      <div className="current-song">
        <h2 id="current-song-title">Now Playing: </h2>
      </div>
    </div>
  );
};

export default Player;
