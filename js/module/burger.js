const closeMenuByOutMenu = () => {
    const headerMenu = document.querySelector(".header__menu");

    document.addEventListener("click", (e) => {
        const target = e.target;
        //если кликаем по кнопке, то переключаем класс
        if (
            target.classList.contains("header__menu-button") &&
            headerMenu.classList.contains("header__menu_active")
        ) {
            hideMenu();
        } else if (
            target.classList.contains("header__menu-button") &&
            !headerMenu.classList.contains("header__menu_active")
        ) {
            showMenu();
        }
        //если клик вне меню, то закрываем его
        else if (!target.classList.contains("header__menu")) {
            hideMenu();
        }
        //дальше нам не надо ловить события...
        e.stopPropagation();
    });
};

closeMenuByOutMenu();

let opacityHideMenu = 1;
const hideMenu = () => {
    const menu = document.querySelector(".header__menu");

    opacityHideMenu -= 0.03;
    menu.style.opacity = opacityHideMenu;
    if (opacityHideMenu > 0) {
        requestAnimationFrame(hideMenu, 20);
    } else {
        menu.classList.remove("header__menu_active");
        opacityHideMenu = 1;
    }
};

let opacityShowMenu = 0;
const showMenu = () => {
    const menu = document.querySelector(".header__menu");

    opacityShowMenu += 0.03;
    menu.style.opacity = opacityShowMenu;
    if (opacityShowMenu < 1) {
        requestAnimationFrame(showMenu, 20);
    } else {
        opacityShowMenu = 0;
        menu.classList.add("header__menu_active");
    }
};