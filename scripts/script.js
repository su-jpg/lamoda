const headerCityButton = document.querySelector(".header__city-button");

let hash = location.hash.substring(1);

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

// запрос базы данных

const getData = async () => {
  const data = await fetch("db.json");
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(
      ` Данные не были получены , ошибка ${data.status} ${data.statusText} `
    );
  }
};
const getGoods = (callback, prop, value) => {
  getData()
    .then((data) => {
      if (value) {
        callback(data.filter((item) => item[prop] === value));
      } else {
        callback(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

subheaderCart.addEventListener("click", cartModuleOpen);

cartOverlay.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".cart__btn-close") || target.matches(".cart-overlay")) {
    cardModuleClose();
  }
});

// страница категорий-

try {
  const goodsList = document.querySelector(".goods__list");
  if (!goodsList) {
    throw "This is not a goods page!";
  }

  const goodsTitle = document.querySelector(".goods__title");
  const changeTitle = () => {
    goodsTitle.textContent = document.querySelector(
      `[href*="#${hash}"]`
    ).textContent;
  };

  const createCard = ({ id, preview, cost, brand, name, sizes }) => {
    const li = document.createElement("li");
    li.classList.add("goods__item");
    li.innerHTML = `
     <article class="good">
        <a class="good__link-img" href="card-good.html#${id}">
            <img class="good__img" src="goods-image/${preview}" alt="">
        </a>
        <div class="good__description">
            <p class="good__price">${cost} &#8381;</p>
            <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
            ${
              sizes
                ? ` <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">
            ${sizes.join(" ")}</span></p>`
                : ""
            }
           
            <a class="good__link" href="card-good.html#${id}">Подробнее</a>
        </div>
      </article>
     `;

    return li;
  };
  const renderGoodsList = (data) => {
    goodsList.textContent = "";

    data.forEach((item) => {
      const card = createCard(item);
      goodsList.append(card);
    });
  };
  window.addEventListener("hashchange", () => {
    hash = location.hash.substring(1);
    changeTitle();
    getGoods(renderGoodsList, "category", hash);
  });
  changeTitle();
  getGoods(renderGoodsList, "category", hash);
} catch (err) {
  console.warn(err);
}

//  страница товара
try {
  if (!document.querySelector(".card-good")) {
    throw "This is not a card-good page!";
  }
  const cardGoodImage = document.querySelector(".card-good__image");
  const cardGoodBrand = document.querySelector(".card-good__brand");
  const cardGoodTitle = document.querySelector(".card-good__title");
  const cardGoodPrice = document.querySelector(".card-good__price");
  const cardGoodColor = document.querySelector(".card-good__color");
  const cardGoodColorList = document.querySelector(".card-good__color-list");
  const cardGoodSizes = document.querySelector(".card-good__sizes");
  const cardGoodSizesList = document.querySelector(".card-good__sizes-list");
  const cardGoodBuy = document.querySelector(".card-good__buy");

  const renderCardGood = ([{ brand, name, cost, color, sizes, photo }]) => {
    cardGoodImage.src = "goods-image/" + photo;
    cardGoodImage.alt = brand + " " + name;

    cardGoodBrand.textContent = brand;
    cardGoodTitle.textContent = name;
    cardGoodPrice.textContent = `${cost} ₽`;
    if (sizes) {
      cardGoodSizes.textContent = sizes[0];
    } else {
      cardGoodSizes.style.display = "none";
    }
    if (color) {
      cardGoodColor.textContent = color[0];
    } else {
      cardGoodSizes.style.display = "none";
    }
  };
  getGoods(renderCardGood, "id", hash);
} catch (err) {
  console.warn(err);
}
