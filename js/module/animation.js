const docEl = document.documentElement;

const currentPageUp = () => {
    const up = document.querySelector('.top');

    const heightViewPort = docEl.clientHeight - up.clientHeight; //высота экрана - высота картинки
    const maxScroll = docEl.scrollHeight - docEl.clientHeight; // высота скролла с учетом картинки

    const percentScroll = (window.pageYOffset * 100) / maxScroll; // проценты скролла
    const shareHeightViewPort = heightViewPort / 100; //значение экрана в пикселях для 1-го процента
    up.style.transform = `translateY(${
        -shareHeightViewPort * percentScroll
    }px)`;
};

window.addEventListener('scroll', currentPageUp);

currentPageUp();
// let opacity = 1;
// const hideMenu = () => {
    
//     const menu = document.querySelector('.header__menu');
//     if (menu.classList.contains('header__menu_active')) {
//         opacity -= 0.03;
//         menu.style.opacity = opacity;
//         if (opacity > 0) {
//             requestAnimationFrame(hideMenu, 30);
//         } else {
//             menu.classList.toggle('header__menu_active');
//         }
//     }
// };

// hideMenu();
// opacity = 0;
// const showMenu = () => {
 
//     const menu = document.querySelector('.header__menu');
//     if (!menu.classList.contains('header__menu_active')) {
//         opacity += 0.03;
//         menu.style.opacity = opacity;
//         if (opacity < 1) {
//             requestAnimationFrame(showMenu, 30);
//         } else {
//             menu.classList.toggle('header__menu_active');
//         }
//     }
// };

// showMenu();
