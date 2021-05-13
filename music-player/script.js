const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Song 1',
    artist: 'Song Writer 1' 
  },
  {
    name: 'jacinto-2',
    displayName: 'Song 2',
    artist: 'Song Writer 2' 
  },
  {
    name: 'jacinto-3',
    displayName: 'Song 3',
    artist: 'Song Writer 3' 
  },
]

let isPlaying = false;

// Check if Playing
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}


function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 1;

// On Load - Select First Song
function prevSong() {
  songIndex--;
  if (songIndex == -1) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex])
  playSong();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
prevBtn.addEventListener('click', prevSong); // 这里prevSong 和 prevSong() 的区别是什么? 
nextBtn.addEventListener('click', nextSong);