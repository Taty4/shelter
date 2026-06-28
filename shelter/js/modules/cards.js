import { shuffle } from "./slider.js";
import { createCard } from "./slider.js";

export function initCards() {
  const wrapperCards = document.querySelector(".main-pets__cards-wrapper");
  const btnNext = document.querySelector(".circle-button.next");
  const btnPrev = document.querySelector(".circle-button.prev");
  const btnFirst = document.querySelector(".circle-button.first");
  const btnLast = document.querySelector(".circle-button.last");
  const counter = document.querySelector(".circle-button.counter");

  let countCards = getCardPreview();
  let currentPage = 1;
  let maxCountPage = 48 / countCards;
  let canNext;
  let canPrev;
  let currentVisiblePets = [];
  let isAnimation;

  async function loadPets() {
    try {
      const response = await fetch("./pets.json");
      const pets = await response.json();

      const pets48 =
        JSON.parse(localStorage.getItem("pets48")) || createFullPets(pets);
      renderCards(pets48);

      btnNext.addEventListener("click", () => {
        if (isAnimation) return;
        isAnimation = true;
        nextPage();
        setTimeout(() => {
          renderCards(pets48);
          isAnimation = false;
        }, 200);
      });
      btnPrev.addEventListener("click", () => {
        if (isAnimation) return;
        isAnimation = true;
        prevPage();
        setTimeout(() => {
          renderCards(pets48);
          isAnimation = false;
        }, 200);
      });
      btnLast.addEventListener("click", () => {
        if (isAnimation) return;
        isAnimation = true;
        lastPage();
        setTimeout(() => {
          renderCards(pets48);
          isAnimation = false;
        }, 200);
      });
      btnFirst.addEventListener("click", () => {
        if (isAnimation) return;
        isAnimation = true;
        firstPage();
        setTimeout(() => {
          renderCards(pets48);
          isAnimation = false;
        }, 200);
      });

      window.addEventListener("resize", () => {
        const countNextCard = getCardPreview();

        if (countCards === countNextCard) {
          return;
        }

        countCards = countNextCard;
        defaultState();
        renderCards(pets48);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function nextPage() {
    currentPage++;

    currentVisiblePets.forEach((card) => {
      card.classList.add("fade-out-next");
    });

    counter.textContent = currentPage;
    canPrev = false;
    btnPrev.disabled = canPrev;
    btnFirst.disabled = canPrev;
    if (currentPage >= maxCountPage) {
      canNext = true;
      btnNext.disabled = canNext;
      btnLast.disabled = canNext;
      return;
    }
  }

  function prevPage() {
    currentPage--;

    currentVisiblePets.forEach((card) => {
      card.classList.add("fade-out-prev");
    });

    counter.textContent = currentPage;
    canNext = false;
    btnNext.disabled = canNext;
    btnLast.disabled = canNext;

    if (currentPage <= 1) {
      canPrev = true;
      btnPrev.disabled = canPrev;
      btnFirst.disabled = canPrev;
      return;
    }
  }

  function lastPage() {
    currentPage = maxCountPage;

    currentVisiblePets.forEach((card) => {
      card.classList.add("fade-out-next");
    });

    counter.textContent = currentPage;
    canPrev = false;
    btnPrev.disabled = canPrev;
    btnFirst.disabled = canPrev;
    canNext = true;
    btnNext.disabled = canNext;
    btnLast.disabled = canNext;
  }

  function firstPage() {
    currentPage = 1;

    currentVisiblePets.forEach((card) => {
      card.classList.add("fade-out-prev");
    });

    counter.textContent = currentPage;
    canNext = false;
    btnNext.disabled = canNext;
    btnLast.disabled = canNext;
    canPrev = true;
    btnPrev.disabled = canPrev;
    btnFirst.disabled = canPrev;
  }

  function defaultState() {
    currentPage = 1;
    maxCountPage = 48 / countCards;
    canNext = false;
    canPrev = true;
    btnNext.disabled = canNext;
    btnLast.disabled = canNext;
    btnPrev.disabled = canPrev;
    btnFirst.disabled = canPrev;
    counter.textContent = currentPage;
  }

  function createFullPets(pets) {
    const pets48 = [...pets];
    for (let i = 0; i < 5; i++) {
      let shuffled = shuffle(pets);

      do {
        shuffled = shuffle(pets);
      } while (pets48[pets48.length - 1] === shuffled[0]);

      pets48.push(...shuffled);
    }
    localStorage.setItem("pets48", JSON.stringify(pets48));
    return pets48;
  }

  function renderCards(pets48) {
    wrapperCards.replaceChildren();
    currentVisiblePets = [];

    const start = currentPage * countCards - countCards;
    const end = currentPage * countCards;

    for (let i = start; i < end; i++) {
      const card = createCard(pets48[i]);
      currentVisiblePets.push(card);
      wrapperCards.append(card);
    }
  }

  function getCardPreview() {
    if (window.matchMedia("(min-width: 769px)").matches) {
      return 8;
    }

    if (window.matchMedia("(min-width: 421px)").matches) {
      return 6;
    }

    return 3;
  }

  loadPets();
}
