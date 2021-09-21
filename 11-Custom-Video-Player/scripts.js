const video = document.querySelector(".viewer");
let status = "paused";

const playOrPause = () => {
  if (status === "paused") {
    video.play();
    status = "played";
  } else {
    video.pause();
    status = "paused";
  }
};

video.addEventListener("click", playOrPause);