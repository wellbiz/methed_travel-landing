// "header__menu-button" и "header__menu"

// и класс "header__menu_active"

const button = document.querySelector(".header__menu-button");
const headerMenu = document.querySelector(".header__menu");
button.addEventListener("click", () => {
  headerMenu.classList.toggle("header__menu_active");
});
