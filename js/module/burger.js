const closeMenuByOutMenu = () => {
    const headerMenu = document.querySelector('.header__menu');

    document.addEventListener('click', (e) => {
        const target = e.target;
        //если кликаем по кнопке, то переключаем класс
        if (target.classList.contains('header__menu-button')) {
            toggleMenu();
            console.log('togglemenu');
            //если клик вне меню, то закрываем его
        } else if (!target.classList.contains('header__menu')) {
            hideMenu();
            console.log(`hidemenu`);
        } else {
            showMenu();
            console.log(`showmenu`);
        }
        //дальше нам не надо ловить события...
        e.stopPropagation();
    });
};

closeMenuByOutMenu();

let opacityHideMenu = 1;
const hideMenu = () => {
    const menu = document.querySelector('.header__menu');

    opacityHideMenu -= 0.1;
    menu.style.opacity = opacityHideMenu;
    if (opacityHideMenu > 0) {
        requestAnimationFrame(hideMenu, 10);
    } else {
        menu.classList.remove('header__menu_active');
    }
};

let opacityToggleMenu = 0;
const toggleMenu = () => {
    const menu = document.querySelector('.header__menu');

    opacityToggleMenu += 0.1;
    menu.style.opacity = opacityToggleMenu;

    if (opacityToggleMenu < 1) {
        requestAnimationFrame(toggleMenu, 10);
    }
    else if (menu.classList.contains('header__menu_active')) {
        menu.classList.remove('header__menu_active');
    } else {
        menu.classList.add('header__menu_active');
    }
};
let opacityShowMenu = 0;
const showMenu = () => {
    const menu = document.querySelector('.header__menu');

    opacityShowMenu += 0.1;
    menu.style.opacity = opacityShowMenu;
    if (opacityShowMenu < 1) {
        requestAnimationFrame(showMenu, 10);
    } else {
        menu.classList.add('header__menu_active');
    }
};
