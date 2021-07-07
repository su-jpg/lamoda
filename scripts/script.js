const headerCityButton = document.querySelector(".header__city-button");

headerCityButton.textContent =
  localStorage.getItem("lomoda-location") || " Ваш город? ";

headerCityButton.addEventListener("click", () => {
  const city = prompt("Какой у вас город?");
  headerCityButton.textContent = city;
  localStorage.setItem("lomoda-location", city);
});
// блокировка скрола

const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  // document.body.style.overflow = "hidden";
  document.body.disableScrollY = window.scrollY;
  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `;
};

const enableScroll = () => {
  // document.body.style.overflow = "";
  document.body.style.cssText = ` `;
  window.scroll({
    top: document.body.dbScrollY,
  });
};

//  модальное окно

const subheaderCart = document.querySelector(".subheader__cart");
const cartOverlay = document.querySelector(".cart-overlay");

const cartModuleOpen = () => {
  cartOverlay.classList.add("cart-overlay-open");
  disableScroll();
};

const cardModuleClose = () => {
  cartOverlay.classList.remove("cart-overlay-open");
  enableScroll();
};

subheaderCart.addEventListener("click", cartModuleOpen);

cartOverlay.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".cart__btn-close") || target.matches(".cart-overlay")) {
    cardModuleClose();
  }
});
