export function initModal(card) {
  const modal = document.querySelector(".modal");
  const btnCloseModal = document.querySelector(".modal__btn-close");

  const imgContainer = modal.querySelector(".modal-content__image");
  const name = modal.querySelector(".modal-content__name");
  const type = modal.querySelector(".modal-content__type--type");
  const breed = modal.querySelector(".modal-content__type--breed");
  const discription = modal.querySelector(".modal-content__information");
  const informations = modal.querySelectorAll("[data-info]");

  async function getCard() {
    try {
      const response = await fetch("./pets.json");
      const pets = await response.json();

      const currentCard = pets.filter((pet) => pet.name === card.dataset.name);
      const pet = currentCard[0];
      updateModal(pet);

      modal.showModal();
    } catch (error) {
      console.log(error);
    }
  }

  getCard();

  btnCloseModal.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  function updateModal(pet) {
    name.textContent = pet.name;
    type.textContent = pet.type;
    breed.textContent = pet.breed;
    discription.textContent = pet.description;
    imgContainer.replaceChildren();
    const img = document.createElement("img");
    img.src = pet.img;
    img.alt = pet.breed;
    img.className = "img";
    imgContainer.append(img);

    informations.forEach((el) => {
      const data = el.dataset.info;
      if (data === "age") {
        el.textContent = pet[data];
      } else {
        el.textContent = pet[data].join(", ");
      }
    });
  }
}
