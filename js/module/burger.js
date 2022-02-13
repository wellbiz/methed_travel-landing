const closeMenuByOutMenu = () => {
    const headerMenu = document.querySelector('.header__menu');

    document.addEventListener('click', (e) => {
        const target = e.target;
        //если кликаем по кнопке, то переключаем класс
        if (target.classList.contains('header__menu-button')) {
            headerMenu.classList.toggle('header__menu_active');
            //если клик вне меню, то закрываем его
        } else if (!target.classList.contains('header__menu'))
            headerMenu.classList.remove('header__menu_active');
        //дальше нам не надо ловить события...
        e.stopPropagation();
    });
};

closeMenuByOutMenu();
