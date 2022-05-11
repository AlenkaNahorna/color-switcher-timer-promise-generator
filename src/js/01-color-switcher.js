const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.body.style.backgroundColor = color;
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
