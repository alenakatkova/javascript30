const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const constraints = {
  audio: false,
  video: {
    width: 1280,
    height: 720
  }
};

navigator.mediaDevices.getUserMedia(constraints)
    .then((mediaStream) => {
      video.srcObject = mediaStream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch((err) => {
      console.log(err.name + ": " + err.message);
    });

video.addEventListener('play', () => {
  const step = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(step)
  };
  window.requestAnimationFrame(step);
});