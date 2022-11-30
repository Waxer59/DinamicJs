//* Variables
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
const skypackBtn = document.querySelector('#skypack-btn');

//* Functions
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
});

skypackBtn.addEventListener('click', () => {
  window.open('https://www.skypack.dev/', '_blank');
});
