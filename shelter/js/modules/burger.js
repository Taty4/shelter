export function initBurger() {
  const burgerIcon = document.querySelector(".burger");
  const menu = document.querySelector(".header__nav-list");
  const body = document.querySelector("body");
  const overlay = document.querySelector(".overlay");
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function closeMenu() {
    menu.classList.remove("is-open");
    burgerIcon.classList.remove("is-open");
    body.classList.remove("no-scroll");
    overlay.classList.remove("is-open");
  }

  burgerIcon.addEventListener("click", () => {
    menu.classList.toggle("is-open");
    burgerIcon.classList.toggle("is-open");
    overlay.classList.toggle("is-open");
    body.classList.toggle("no-scroll");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest(".header__nav-item")) {
      closeMenu();
    }
  });

  overlay.addEventListener("click", () => {
    closeMenu();
  });

  if (mediaQuery.matches) {
    closeMenu();
  }

  mediaQuery.addEventListener("change", () => {
    if (mediaQuery.matches) {
      closeMenu();
    }
  });
}
