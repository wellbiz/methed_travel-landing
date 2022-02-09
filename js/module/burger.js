
const button = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
button.addEventListener('click', () => {
    headerMenu.classList.toggle('header__menu_active');
});

const headerList = document.querySelector('.header__list');

headerList.addEventListener('click', (e) => {
    if (e.target.matches('.header__link'))
        headerMenu.classList.toggle('header__menu_active');
});
headerMenu.addEventListener('mouseleave', (e) => {
    
        headerMenu.classList.remove('header__menu_active');
});
