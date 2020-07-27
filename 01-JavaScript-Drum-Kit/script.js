// get from the layout all keys which we use in the drum kit
let keys = Array.prototype.slice.call(document.querySelectorAll(".key"))
    .map(button => button.dataset.key);

// add class "playing" on keypress and remove it after transition ends
document.addEventListener("keydown", (e) => {
  let keyPressedValue = e.key.toLowerCase();
  let keyPressedElement = document.querySelector(`div[data-key="${keyPressedValue}"]`);

  if (keys.indexOf(keyPressedValue) > -1) {
    keyPressedElement.classList.add("playing");
    document.querySelector(`audio[data-key="${keyPressedValue}"]`).play();
    keyPressedElement.addEventListener("transitionend", () => {
      keyPressedElement.classList.remove("playing");
    });
  }
});