// src/components/Playlist.js
import React from 'react';

const Playlist = () => {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul id="playlist">
        {/* Add playlist items dynamically here */}
      </ul>
      <div className="text-center" style={{ textAlign: 'center' }}>
        <button
          id="upload-songs"
          style={{
            width: '10%',
            padding: '10px',
            backgroundColor: '#6a82fb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Upload Songs
        </button>
      </div>
    </div>
  );
};

export default Playlist;
