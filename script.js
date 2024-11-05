// URLs for each card pack. This example uses the base pack URL. 
// Additional packs can be added with their respective URLs in CSV format.
const packUrls = {
  base: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQfXMJhsJ2dICDAJC85vERBUCz7jO7BeP_P4mRPTHEZdzTpvUIiuq3bz53TlRyikjKgwXPyYYmvl52M/pub?gid=10&single=true&output=csv',  // Replace with actual CSV URL
  // Add more packs here as needed.
};

// Variables to track which packs are selected and which card type (black or white) is being drawn.
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
  try {
    const cards = await fetchCards(selectedPacks, cardType);
    displayCard(cards);
  } catch (error) {
    console.error("Error fetching or parsing cards:", error);
    alert("Failed to load cards. Please check the console for more details.");
  }
}

async function fetchCards(packs, type) {
  const cards = [];
  for (let pack of packs) {
    try {
      const response = await fetch(packUrls[pack]);
      const text = await response.text();
      
      // Split rows and parse each row
      const rows = text.split('\n').slice(5);  // Adjusted for header and comments
      for (let row of rows) {
        // Split by comma, but handle cases where text contains commas
        const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        
        // Check if row has valid data for type and card text
        if (columns && columns[0] === type.charAt(0).toUpperCase() + type.slice(1)) {
          const cardText = columns[1].replace(/"/g, '');  // Remove any extra quotes around the text
          cards.push(cardText);
        }
      }
    } catch (error) {
      console.error(`Error fetching data for pack: ${pack}`, error);
    }
  }
  return cards;
}

function displayCard(cards) {
  const cardContent = document.getElementById('card-content');
  cardContent.innerHTML = '';

  if (cards.length === 0) {
    cardContent.textContent = "No cards available for the selected packs.";
    return;
  }

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
  document.getElementById('card-selection-menu').style.display = 'none';
  document.getElementById('card-display').style.display = 'block';
}
