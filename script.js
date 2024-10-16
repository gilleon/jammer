// Select elements
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const stopButton = document.getElementById("stop");
const volumeButton = document.getElementById("volume-button");
const volumeSlider = document.getElementById("volume-slider");
const seekBar = document.getElementById("seek-bar");
const elapsedTimeDisplay = document.getElementById("elapsed-time");
const totalTimeDisplay = document.getElementById("total-time");
const playerContainer = document.querySelector(".music-player-container");

// Variables to track state
let isPlaying = false;
let updateInterval;

// Play/Pause functionality
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    playerContainer.classList.remove("active");
    clearInterval(updateInterval);
  } else {
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    updateInterval = setInterval(updateElapsedTimeAndSeekBar, 500);
    playerContainer.classList.add("active");
  }
  isPlaying = !isPlaying;
});

// Stop functionality
stopButton.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  isPlaying = false;
  playerContainer.classList.remove("active");
  clearInterval(updateInterval);
  updateElapsedTimeAndSeekBar();
});

// Update elapsed time and seek bar as song plays
function updateElapsedTimeAndSeekBar() {
  const elapsedMinutes = Math.floor(audio.currentTime / 60);
  const elapsedSeconds = Math.floor(audio.currentTime % 60);
  elapsedTimeDisplay.textContent = `${elapsedMinutes}:${
    elapsedSeconds < 10 ? "0" : ""
  }${elapsedSeconds}`;
  seekBar.value = (audio.currentTime / audio.duration) * 100;
}

// Update total time on metadata load
audio.addEventListener("loadedmetadata", () => {
  updateTotalTime();
});

// Function to update the total time
function updateTotalTime() {
  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);
  totalTimeDisplay.textContent = `${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;
  seekBar.max = 100;
}

// Switch button to play when song ends
audio.addEventListener("ended", () => {
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  isPlaying = false;
  playerContainer.classList.remove("active");
});

// Seek functionality
seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  const volumeLevel = volumeSlider.value;
  audio.volume = volumeLevel;
  if (volumeLevel == 0) {
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else if (volumeLevel <= 0.5) {
    volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});

// Volume button toggling mute/unmute
volumeButton.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    audio.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});
