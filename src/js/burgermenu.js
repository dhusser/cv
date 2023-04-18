const toggleClass = (elements, className) => {
  elements.forEach(element => element.classList.toggle(className));
}

const menuBtn = document.querySelector('.menu-btn'),
  menu = document.querySelector('.menu'),
  menuList = document.querySelector('.menu-list');

menuBtn.addEventListener('click', () => toggleClass([menuBtn, menu], 'active'));
menu.addEventListener('click', () => toggleClass([menuBtn, menu], 'active'));
menuList.addEventListener('click', event => {
  if (event.target.classList.contains('menu-link')) toggleClass([menuBtn, menu], 'active');
  event.stopPropagation();
});