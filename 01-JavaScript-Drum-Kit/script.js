// get from the layout all keys which we use in the drum kit
let keys = Array.prototype.slice.call(document.querySelectorAll(".key"))
    .map(button => button.dataset.key);

// add class "playing" on keypress
document.addEventListener("keydown", (e) => {
  let keyPressed = e.key.toLowerCase();

  if (keys.indexOf(keyPressed) > -1) {
    document.querySelector(`div[data-key="${keyPressed}"]`).classList.add("playing");
  }
});