// URLs for each card pack. This example uses the base pack URL. 
// Additional packs can be added with their respective URLs in CSV format.
const packUrls = {
  base: 'https://docs.google.com/spreadsheets/d/1lsy7lIwBe-DWOi2PALZPf5DgXHx9MEvKfRw1GaWQkzg/export?format=csv&gid=10',  // Replace with actual CSV URL
  // Add more packs here as needed.
};

// Variables to track which packs are selected and which card type (black or white) is being drawn.
let selectedPacks = [];
let cardType = '';

// Function to show the pack selection menu for drawing black or white cards.
// The 'type' parameter determines if it's black ('Prompt') or white ('Response') cards.
function showCardMenu(type) {
  cardType = type; // Set the global cardType variable to the chosen card type.
  document.getElementById('main-menu').style.display = 'none';  // Hide the main menu.
  document.getElementById('card-selection-menu').style.display = 'block';  // Show the pack selection menu.
}

// Function to return the user to the main menu and reset display elements.
function backToMenu() {
  document.getElementById('main-menu').style.display = 'block';  // Show the main menu.
  document.getElementById('card-selection-menu').style.display = 'none';  // Hide the pack selection menu.
  document.getElementById('card-display').style.display = 'none';  // Hide the card display area.
  document.getElementById('card-content').innerHTML = '';  // Clear any previously displayed cards.
}

// Function triggered when the player confirms their pack selection and wants to draw cards.
async function drawCard() {
  // Capture selected packs from the dropdown menu.
  selectedPacks = Array.from(document.getElementById('pack-selection').selectedOptions).map(option => option.value);
  
  // Fetch cards of the specified type from the selected packs and display them.
  const cards = await fetchCards(selectedPacks, cardType);
  displayCard(cards);
}

// Function to fetch cards of a specified type (black or white) from the selected packs.
// Uses async/await to handle asynchronous data fetching from CSV URLs.
async function fetchCards(packs, type) {
  const cards = [];  // Array to store the fetched cards.

  // Loop through each selected pack URL, fetch its data, and parse it.
  for (let pack of packs) {
    const response = await fetch(packUrls[pack]);  // Fetch the CSV data for each pack.
    const text = await response.text();  // Convert the response to text format (CSV).
    const rows = text.split('\n').slice(1);  // Split into rows and ignore the first row (header).

    // Loop through each row in the CSV, extracting card type and text.
    for (let row of rows) {
      const [cardType, cardText] = row.split(',');  // Split row by commas to separate type and text.
      
      // Add the card to the list if it matches the selected card type.
      if (cardType === type.charAt(0).toUpperCase() + type.slice(1)) {
        cards.push(cardText);
      }
    }
  }
  return cards;  // Return the array of cards of the specified type.
}

// Function to display randomly selected cards based on card type.
// For black cards, it displays one card; for white cards, it displays seven.
function displayCard(cards) {
  const cardContent = document.getElementById('card-content');  // Get the element to display the card(s).
  cardContent.innerHTML = '';  // Clear any previously displayed cards.

  // If the player selected "Draw Black Card", show one random black card.
  if (cardType === 'black') {
    const randomBlackCard = cards[Math.floor(Math.random() * cards.length)];  // Pick a random black card.
    cardContent.textContent = randomBlackCard;  // Display the card text.
  } else {
    // If the player selected "Draw White Cards", show seven random white cards.
    for (let i = 0; i < 7; i++) {
      const randomWhiteCard = cards[Math.floor(Math.random() * cards.length)];  // Pick a random white card.
      const cardElement = document.createElement('div');  // Create a div element for each white card.
      cardElement.className = 'white-card';  // Add a class to style the white cards.
      cardElement.textContent = randomWhiteCard;  // Set the text of the white card.
      cardContent.appendChild(cardElement);  // Append the white card to the card content area.
    }
  }
  
  // Hide the selection menu and show the card display area.
  document.getElementById('card-selection-menu').style.display = 'none';
  document.getElementById('card-display').style.display = 'block';
}
