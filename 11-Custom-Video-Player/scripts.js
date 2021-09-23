const SYMBOLS = {
  play: "&#9654;",
  pause: "&#9616;&#9616;"
};

// elements
const video = document.querySelector(".viewer");
const toggleButton = document.querySelector(".toggle");
const volume = document.querySelector(".volume");
const playbackRate = document.querySelector(".playbackRate");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const skipButtons = document.querySelectorAll(".skip");
const fullscreenButton = document.querySelector(".fullscreen")

//state
let isChangingProgress = false;

// initial settings
toggleButton.innerHTML = SYMBOLS.play;
video.volume = volume.value;
video.playbackRate = playbackRate.value;
progressFilled.style.flexBasis = "0";

// functions
const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
};

const updateToggleButton = () => {
  if (video.paused) {
    toggleButton.innerHTML = SYMBOLS.play;
  } else {
    toggleButton.innerHTML = SYMBOLS.pause;
  }
};

const colorProgressBar = (playedPercentage) => {
  progressFilled.style.flexBasis =  playedPercentage + "%";
};

const changeProgressOnProgressBar = (e) => {
  const progressBarWidth = progress.getBoundingClientRect().width;
  let x = e.offsetX;
  let newProgress = x / progressBarWidth;
  colorProgressBar(newProgress * 100);
  video.currentTime = video.duration * newProgress;
};

const changeProgressOnMousemove = (e) => {
  if (isChangingProgress === true) {
    changeProgressOnProgressBar(e);
  }
};

const stopChangingProgressOnMousemove = () => {
  isChangingProgress = false;
  progress.removeEventListener("mousemove", changeProgressOnMousemove);
};

// adding listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);
toggleButton.addEventListener("click", togglePlay);
volume.addEventListener("input", () => {
  video.volume = volume.value;
});
playbackRate.addEventListener("input", () => {
  video.playbackRate = playbackRate.value;
});
video.addEventListener("timeupdate", () => {
  colorProgressBar((video.currentTime / video.duration) * 100);
});
progress.addEventListener("mousedown", (e) => {
  isChangingProgress = true;
  changeProgressOnProgressBar(e);
  progress.addEventListener("mousemove", changeProgressOnMousemove);
  progress.addEventListener("mouseup", stopChangingProgressOnMousemove);
});
document.addEventListener("mouseup", () => isChangingProgress && stopChangingProgressOnMousemove());
[...skipButtons].forEach(button => {
  button.addEventListener("click", () => {
    video.currentTime += Number(button.dataset.skip);
  })
});
fullscreenButton.addEventListener("click", toggleFullscreen);
