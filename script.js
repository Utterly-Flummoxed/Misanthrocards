const packUrls = {
  base: 'https://docs.google.com/spreadsheets/d/1lsy7lIwBe-DWOi2PALZPf5DgXHx9MEvKfRw1GaWQkzg/edit?gid=10#gid=10',  // Replace with actual CSV URL
  // Add more packs here
};

let selectedPacks = [];
let cardType = '';

function showCardMenu(type) {
  cardType = type;
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('card-selection-menu').style.display = 'block';
}

function backToMenu() {
  document.getElementById('main-menu').style.display = 'block';
  document.getElementById('card-selection-menu').style.display = 'none';
  document.getElementById('card-display').style.display = 'none';
  document.getElementById('card-content').innerHTML = '';
}

async function drawCard() {
  selectedPacks = Array.from(document.getElementById('pack-selection').selectedOptions).map(option => option.value);
  const cards = await fetchCards(selectedPacks, cardType);
  displayCard(cards);
}

async function fetchCards(packs, type) {
  const cards = [];
  for (let pack of packs) {
    const response = await fetch(packUrls[pack]);
    const text = await response.text();
    const rows = text.split('\n').slice(1);  // Skip header
    for (let row of rows) {
      const [cardType, cardText] = row.split(',');
      if (cardType === type.charAt(0).toUpperCase() + type.slice(1)) {
        cards.push(cardText);
      }
    }
  }
  return cards;
}

function displayCard(cards) {
  const cardContent = document.getElementById('card-content');
  cardContent.innerHTML = '';
  if (cardType === 'black') {
    const randomBlackCard = cards[Math.floor(Math.random() * cards.length)];
    cardContent.textContent = randomBlackCard;
  } else {
    for (let i = 0; i < 7; i++) {
      const randomWhiteCard = cards[Math.floor(Math.random() * cards.length)];
      const cardElement = document.createElement('div');
      cardElement.className = 'white-card';
      cardElement.textContent = randomWhiteCard;
      cardContent.appendChild(cardElement);
    }
  }
  document.getElementById('card-selection-menu').style.display = 'none';
  document.getElementById('card-display').style.display = 'block';
}
