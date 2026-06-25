import { initBurger } from "./modules/burger.js";
import { initCards } from "./modules/cards.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("work");
  initBurger();
  initCards();
});
