const SYMBOLS = {
  play: "&#9654;",
  pause: "&#9616;&#9616;"
};

// elements
const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const volume = document.querySelector(".volume");
const playbackRate = document.querySelector(".playbackRate");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const skipButtons = document.querySelectorAll(".skip");

//state
let status = "paused";
let isChangingProgress = false;

// initial settings
toggle.innerHTML = SYMBOLS.play;
video.volume = volume.value;
video.playbackRate = playbackRate.value;
progressFilled.style.width = "0";
progressFilled.style.flexBasis = "0";

// functions
const playOrPause = () => {
  if (status === "paused") {
    video.play();
    status = "played";
    toggle.innerHTML = SYMBOLS.pause;
  } else {
    video.pause();
    status = "paused";
    toggle.innerHTML = SYMBOLS.play;
  }
};

const colorProgressBar = (playedPercentage) => {
  const progressBarFilledWidth = playedPercentage + "%";
  progressFilled.style.width = progressBarFilledWidth;
  progressFilled.style.flexBasis =  progressBarFilledWidth;
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
video.addEventListener("click", playOrPause);
toggle.addEventListener("click", playOrPause);
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
document.addEventListener("mouseup", () => {
  if (isChangingProgress === true) {
    stopChangingProgressOnMousemove();
  }
});
[...skipButtons].forEach(button => {
  button.addEventListener("click", () => {
    video.currentTime = video.currentTime + Number(button.dataset.skip);
  })
});
