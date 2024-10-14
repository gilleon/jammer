const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const stopBtn = document.getElementById("stop");
const volumeUpBtn = document.getElementById("volume-up");
const volumeDownBtn = document.getElementById("volume-down");
const volumeLevelDisplay = document.getElementById("volume-level");
const elapsedTimeDisplay = document.getElementById("elapsed-time");

let isPlaying = false;

// Play/Pause Functionality
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

// Stop Functionality
stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  isPlaying = false;
});

// Volume Up
volumeUpBtn.addEventListener("click", () => {
  if (audio.volume < 1) {
    audio.volume = Math.min(1, audio.volume + 0.1);
  }
  updateVolumeDisplay();
});

// Volume Down
volumeDownBtn.addEventListener("click", () => {
  if (audio.volume > 0) {
    audio.volume = Math.max(0, audio.volume - 0.1);
  }
  updateVolumeDisplay();
});

// Update Volume Display
function updateVolumeDisplay() {
  volumeLevelDisplay.textContent = `${Math.round(audio.volume * 100)}%`;
}

// Update Elapsed Time
audio.addEventListener("timeupdate", () => {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60)
    .toString()
    .padStart(2, "0");
  elapsedTimeDisplay.textContent = `${minutes}:${seconds}`;
});
