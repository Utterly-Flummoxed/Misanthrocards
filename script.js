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

function drawBlackCard() {
  cardDisplay.innerHTML = "";
  const randomBlackCard = blackCards[Math.floor(Math.random() * blackCards.length)];
  const blackCardElement = document.createElement("div");
  blackCardElement.id = "blackCard";
  blackCardElement.innerText = randomBlackCard;
  cardDisplay.appendChild(blackCardElement);
  backButton.style.display = "block";
}

function drawWhiteCards() {
  cardDisplay.innerHTML = "";
  const whiteCardContainer = document.createElement("div");
  whiteCardContainer.id = "whiteCards";
  for (let i = 0; i < 7; i++) {
