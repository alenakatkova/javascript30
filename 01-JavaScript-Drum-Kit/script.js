/**
 * @param {string} keyPressedValue
 */
const playAudio = (keyPressedValue) => {
  const audio = document.querySelector(`audio[data-key="${keyPressedValue}"]`);
  audio.currentTime = 0;
  audio.play();
};

// get from the layout all keys which we use in the drum kit
const keys = Array.prototype.slice.call(document.querySelectorAll(".key"))
    .map(button => button.dataset.key);

// add class "playing" on keypress and remove it after transition ends
document.addEventListener("keydown", (e) => {
  const keyPressedValue = e.key.toLowerCase();
  const keyPressedElement = document.querySelector(`div[data-key="${keyPressedValue}"]`);

  if (keys.indexOf(keyPressedValue) > -1) {
    keyPressedElement.classList.add("playing");
    playAudio(keyPressedValue);

    const removeActiveClassHandler = () => {
      keyPressedElement.classList.remove("playing");
      keyPressedElement.removeEventListener("transitionend", removeActiveClassHandler);
    };

    keyPressedElement.addEventListener("transitionend", removeActiveClassHandler);
  }
});
