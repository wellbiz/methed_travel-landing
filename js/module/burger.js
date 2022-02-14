const closeMenuByOutMenu = () => {
    const headerMenu = document.querySelector('.header__menu');

    document.addEventListener('click', (e) => {
        const target = e.target;
        //если кликаем по кнопке, то переключаем класс
        if (target.classList.contains('header__menu-button')) {
            showMenu();
            //если клик вне меню, то закрываем его
        } else if (!target.classList.contains('header__menu')) hideMenu();
        //дальше нам не надо ловить события...
        e.stopPropagation();
    });
};

closeMenuByOutMenu();

let opacity = 1;
const hideMenu = () => {
    const menu = document.querySelector('.header__menu');

    opacity -= 0.05;
    menu.style.opacity = opacity;
    if (opacity > 0) {
        requestAnimationFrame(hideMenu, 10);
    } else {
        menu.classList.remove('header__menu_active');
    }
};

opacity = 0;
const showMenu = () => {
    const menu = document.querySelector('.header__menu');

    opacity += 0.05;
    menu.style.opacity = opacity;
    if (opacity < 1) {
        requestAnimationFrame(showMenu, 10);
    } else {
        menu.classList.add('header__menu_active');
    }
};
