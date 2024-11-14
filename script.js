let cardsData = [];
let selectedType = "";

async function loadCards() {
  try {
    const response = await fetch("cards.json");
    cardsData = await response.json();
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

function openCardSelection(type) {
  selectedType = type;
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("card-selection").style.display = "block";
}

function getSelectedPacks() {
  const packSelect = document.getElementById("pack-selection");
  return Array.from(packSelect.selectedOptions).map(option => option.value);
}

function drawCards() {
  const selectedPacks = getSelectedPacks();
  const filteredCards = cardsData.filter(
    card => card.Type === selectedType && selectedPacks.includes(card.Pack)
  );

  let drawnCards;
  if (selectedType === "Prompt") {
    drawnCards = [filteredCards[Math.floor(Math.random() * filteredCards.length)]];
  } else {
    drawnCards = [];
    for (let i = 0; i < 7; i++) {
      const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
      drawnCards.push(randomCard);
    }
  }

  displayCards(drawnCards);
}

function displayCards(cards) {
  document.getElementById("card-selection").style.display = "none";
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card.Text;
    cardsContainer.appendChild(cardElement);
  });

  document.getElementById("card-display").style.display = "block";
}

function returnToMenu() {
  document.getElementById("card-selection").style.display = "none";
  document.getElementById("card-display").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
}

loadCards();
