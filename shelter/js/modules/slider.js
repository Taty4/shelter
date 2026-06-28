import { initModal } from "./modal.js";

export function initSlider() {
  const visible = document.querySelector(".slider__visible");
  const sliderContainer = document.querySelector(".slider__track");
  const left = document.querySelector(".arrow-left");
  const right = document.querySelector(".arrow-right");

  let isAnimation;

  async function loadPets() {
    try {
      const response = await fetch("./pets.json");
      let pets = await response.json();

      let cardsToRender = pets.slice(0, countCards);
      renderCardsStart(cardsToRender);

      left.addEventListener("click", () => {
        if (isAnimation) return;
        isAnimation = true;
        visible.style.overflowX = "hidden";

        sliderContainer.style.transition = "none";

        cardsToRender = createCardsToRender(pets, cardsToRender);
        renderCardsLeft(cardsToRender);

        sliderContainer.style.transform = "translateX(-100%)";
        setTimeout(() => {
          sliderContainer.style.transition = "0.5s";
          sliderContainer.style.transform = "translateX(0)";
        }, 0);

        setTimeout(() => {
          sliderContainer.lastElementChild?.remove();
          visible.style.overflowX = "visible";
          isAnimation = false;
        }, 500);
      });

      right.addEventListener("click", () => {
        if (isAnimation) return;
        isAnimation = true;
        visible.style.overflowX = "hidden";

        cardsToRender = createCardsToRender(pets, cardsToRender);
        renderCardsRight(cardsToRender);

        sliderContainer.style.transition = "0.5s";
        sliderContainer.style.transform = "translateX(-100%)";
        setTimeout(() => {
          sliderContainer.style.transition = "none";
          sliderContainer.firstElementChild?.remove();
          sliderContainer.style.transform = "translateX(0)";
          visible.style.overflowX = "visible";
          isAnimation = false;
        }, 500);
      });

      window.addEventListener("resize", () => {
        const countNextCard = getCardPreview();

        if (countCards === countNextCard) {
          return;
        }

        countCards = countNextCard;
        cardsToRender = pets.slice(0, countCards);
        renderCardsStart(cardsToRender);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function createCardsToRender(allPets, unavailableCards = []) {
    const availableCards = allPets.filter(
      (pet) => !unavailableCards.includes(pet),
    );
    const shuffled = shuffle(availableCards);

    return shuffled.slice(0, countCards);
  }

  function renderCardsStart(array) {
    sliderContainer.replaceChildren();
    const cardContainer = document.createElement("div");
    cardContainer.className = "slider__part";
    array.forEach((element) => {
      const card = createCard(element);
      cardContainer.append(card);
    });
    sliderContainer.append(cardContainer);
  }

  function renderCardsLeft(array) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "slider__part";
    array.forEach((element) => {
      const card = createCard(element);
      cardContainer.append(card);
    });
    sliderContainer.prepend(cardContainer);
  }

  function renderCardsRight(array) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "slider__part";
    array.forEach((element) => {
      const card = createCard(element);
      cardContainer.append(card);
    });
    sliderContainer.append(cardContainer);
  }

  let countCards = getCardPreview();

  function getCardPreview() {
    if (window.matchMedia("(min-width: 1100px)").matches) {
      return 3;
    }

    if (window.matchMedia("(min-width: 750px)").matches) {
      return 2;
    }

    return 1;
  }

  loadPets();
}

export function createCard(card) {
  const div = document.createElement("div");
  div.className = "slider__item card";
  div.dataset.name = card.name;

  const img = document.createElement("img");
  img.className = "img";
  img.src = card.img;

  const p = document.createElement("p");
  p.className = "card__pet-name";
  p.textContent = card.name;

  const button = document.createElement("button");
  button.className = "button button--width-187 button--bgc-transparent";
  button.textContent = "Learn More";

  div.addEventListener("click", (event) => {
    initModal(event.currentTarget);
  });

  div.append(img, p, button);

  return div;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
