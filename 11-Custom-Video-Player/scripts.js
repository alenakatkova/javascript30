const symbols = {
  play: "&#9654;",
  pause: "&#9616;&#9616;"
};

const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const volume = document.querySelector(".volume");

let status = "paused";

const playOrPause = () => {
  if (status === "paused") {
    video.play();
    status = "played";
    toggle.innerHTML = symbols.pause;
  } else {
    video.pause();
    status = "paused";
    toggle.innerHTML = symbols.play;
  }
};

toggle.innerHTML = symbols.play;
video.volume = volume.value;

video.addEventListener("click", playOrPause);
toggle.addEventListener("click", playOrPause);
volume.addEventListener("input", () => {
  video.volume = volume.value;
});