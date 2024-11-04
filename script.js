const blackCards = [
  "The last thing I saw on TV was _______",
  "I wouldn't be surprised if _______ became the next president.",
  "For my next trick, I will pull _______ out of my hat.",
  "I got 99 problems, but _______ ain't one.",
  // Add more black cards here...
];

const whiteCards = [
  "Slapping a baby.",
  "A menstrual cramp that could kill a camel.",
  "Public speaking without preparation.",
  "Ghosts with a terrible sense of humor.",
  // Add more white cards here...
];

const menu = document.getElementById("menu");
const cardDisplay = document.getElementById("cardDisplay");
const backButton = document.getElementById("backButton");

backButton.style.display = "none"; // Hide initially

const drawBlackCardButton = document.getElementById("drawBlackCard");
const drawWhiteCardsButton = document.getElementById("drawWhiteCards");

drawBlackCardButton.addEventListener("click", () => {
  cardDisplay.innerHTML = "";
  const randomBlackCard = blackCards[Math.floor(Math.random() * blackCards.length)];
  const blackCardElement = document.createElement("div");
  blackCardElement.id = "blackCard";
  blackCardElement.innerText = randomBlackCard;
  cardDisplay.appendChild(blackCardElement);
  backButton.style.display = "block";
});

drawWhiteCardsButton.addEventListener("click", () => {
  cardDisplay.innerHTML = "";
  const whiteCardContainer = document.createElement("div");
  whiteCardContainer.id = "whiteCards";
  for (let i = 0; i < 7; i++) {
    const randomWhiteCard = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    const whiteCardElement = document.createElement("div");
    whiteCardElement.classList.add("whiteCard");
    whiteCardElement.innerText = randomWhiteCard;
    whiteCardContainer.appendChild(whiteCardElement);
  }
  cardDisplay.appendChild(whiteCardContainer);
  backButton.style.display = "block";
});

backButton.addEventListener("click", () => {
  cardDisplay.innerHTML = "";
  backButton.style.display = "none";
  menu.style.display = "block";
});
