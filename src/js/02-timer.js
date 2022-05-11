import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let intervalId = null;

refs.btnStart.addEventListener('click', clickOnBtnStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0].getTime() < date.getTime()) {
      refs.btnStart.disabled = true;
      return Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

const pickr = flatpickr(refs.input, options);

function clickOnBtnStart() {
  intervalId = setInterval(() => {
    const newDate = new Date();
    const selectedData = pickr.selectedDates[0];
    const timerData = selectedData.getTime() - newDate.getTime();
    if (timerData < 0) {
      clearInterval(intervalId);
      return;
    }
    const convertedData = convertMs(timerData);
    populateDate(convertedData);
    refs.btnStart.disabled = true;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function populateDate(config) {
  refs.days.textContent = addLeadingZero(config.days);
  refs.hours.textContent = addLeadingZero(config.hours);
  refs.minutes.textContent = addLeadingZero(config.minutes);
  refs.seconds.textContent = addLeadingZero(config.seconds);
}
