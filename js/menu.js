//* Variables
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

//* Functions
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
});
