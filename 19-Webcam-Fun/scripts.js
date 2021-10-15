const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL('image/png');
  const photoLinkContainer = document.createElement('a');
  photoLinkContainer.setAttribute('href', data);
  photoLinkContainer.setAttribute('download', 'handsome');
  photoLinkContainer.innerHTML = `<img src=${data}>`;
  strip.appendChild(photoLinkContainer);
};

const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

const getRgbRangesFromInputs = () => {
  return [...document.querySelectorAll('input[type="range"]')].reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});
};

const deletePixelsInRange = (pixels, ranges) => {
  for (let i = 0; i < pixels.data.length; i+=4) {
    const red = pixels.data[i];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];

    if (
        isInRange(red, ranges.rmin, ranges.rmax)
        && isInRange(green, ranges.gmin, ranges.gmax)
        && isInRange(blue, ranges.bmin, ranges.bmax)
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
};

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
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  const step = () => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = deletePixelsInRange(pixels, getRgbRangesFromInputs());
    ctx.putImageData(pixels, 0, 0);
    window.requestAnimationFrame(step)
  };
  window.requestAnimationFrame(step);
});