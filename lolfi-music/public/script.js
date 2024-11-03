// const songs = [
//     { title: "creative-technology-showreel-241274.mp3", file: "music/lofi-piano-quotdreamyquot-248626.mp3" },
//     { title: "amalgam-217007.mp3", file: "music/lofi-piano-quotmemoriesquot-248627.mp3" },
//     { title: "separation-185196.mp3", file: "music/separation-185196.mp3" },
//     { title: "chill-lofi-music-interior-lounge-256260.mp3", file: "music/chill-lofi-music-interior-lounge-256260.mp3" },
//     { title: "coverless-book-lofi-186307.mp3", file: "music/coverless-book-lofi-186307.mp3" },
//     { title: "tasty-chill-lofi-vibe-242105.mp3", file: "music/tasty-chill-lofi-vibe-242105.mp3" },
// ];

// let currentSongIndex = localStorage.getItem('currentSongIndex') ? 
//                         parseInt(localStorage.getItem('currentSongIndex')) : 0;

// const audio = document.getElementById('audio');
// const audioSource = document.getElementById('audio-source');
// const playlist = document.getElementById('playlist');
// const progress = document.getElementById('progress');
// const volume = document.getElementById('volume');
// const currentTimeLabel = document.getElementById('current-time');
// const durationLabel = document.getElementById('duration');
// const playButton = document.getElementById('play');
// const prevButton = document.getElementById('prev');
// const nextButton = document.getElementById('next');
// const currentSongTitle = document.getElementById('current-song-title');

// // Load songs into the playlist
// songs.forEach((song, index) => {
//     const li = document.createElement('li');
//     li.classList.add('song-card');

//     // Create a play button
//     const playBtn = document.createElement('button');
//     playBtn.classList.add('play-button');
//     playBtn.setAttribute('data-audio', song.file);
//     playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    
//     // Add event listener to play button
//     playBtn.addEventListener('click', () => {
//         currentSongIndex = index;
//         loadSong();
//         audio.play();
//     });

//     li.innerHTML = song.title;
//     li.appendChild(playBtn);
//     playlist.appendChild(li);
// });

// // Load song
// function loadSong() {
//     audioSource.src = songs[currentSongIndex].file;
//     audio.load();
//     currentSongTitle.textContent = `Now Playing: ${songs[currentSongIndex].title}`;
//     durationLabel.textContent = "Loading...";

//     audio.addEventListener('loadedmetadata', () => {
//         durationLabel.textContent = formatTime(audio.duration);
//         audio.currentTime = localStorage.getItem('currentTime') ? 
//                            parseFloat(localStorage.getItem('currentTime')) : 0;
//     });
// }

// // Function to format time in MM:SS
// function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
// }

// // Play or pause song
// playButton.addEventListener('click', () => {
//     if (audio.paused) {
//         audio.play();
//         playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
//     } else {
//         audio.pause();
//         playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
//     }
// });

// // Next song
// nextButton.addEventListener('click', () => {
//     currentSongIndex = (currentSongIndex + 1) % songs.length;
//     loadSong();
//     audio.play();
// });

// // Previous song
// prevButton.addEventListener('click', () => {
//     currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
//     loadSong();
//     audio.play();
// });

// // Autoplay to the next song when the current one ends
// audio.addEventListener('ended', () => {
//     currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song
//     loadSong();
//     audio.play();
// });

// // Update progress bar and time labels as the audio plays
// audio.addEventListener('timeupdate', () => {
//     const percentage = (audio.currentTime / audio.duration) * 100;
//     progress.value = percentage;
//     currentTimeLabel.textContent = formatTime(audio.currentTime);
// });

// // Seek the audio when the progress bar is moved
// progress.addEventListener('input', () => {
//     const seekTime = (progress.value / 100) * audio.duration;
//     audio.currentTime = seekTime;
// });

// // Change the volume
// volume.addEventListener('input', () => {
//     audio.volume = volume.value / 100;
// });

// // Save current song index and current time before the page unloads
// window.addEventListener('beforeunload', () => {
//     localStorage.setItem('currentSongIndex', currentSongIndex);
//     localStorage.setItem('currentTime', audio.currentTime);
// });

// // Load the last played song and start playing
// loadSong();
// audio.play(); // Autoplay the song
