/*
legion.js

Web application for the setup of battle cards for the skirmish format
in the Star Wars: Legion tabletop miniatures game.

Ryan Paton
2020-07-27
*/

// TODO: may need to preload images
// TODO: fix cards remaining blurred

// Message constants
const MSG_BLUE_TURN = "Blue players turn, eliminate a card or pass";
const MSG_RED_TURN = "Red players turn, eliminate a card or pass";

// Card style constants
const DIV_THIRD = "w3-col s4 m4 l4";
const CARD_IMAGE = "w3-round-large";
const IMAGE_STYLE = "width:100%;max-width:300px";

// Players
const P_BLUE = "Blue Player";
const P_RED = "Red Player";

var setupStatus = {currentPlayer:P_BLUE, blueTurns:0, redTurns:0};

var deploymentDeck = [{name:"Battle Lines", source:"card_images/deployment_battle_lines.png"},
	{name:"Faceoff", source:"card_images/deployment_faceoff.png"},
	{name:"Flanking Positions", source:"card_images/deployment_flanking.png"},
	{name:"Meeting Engagement", source:"card_images/deployment_meeting.png"}];

var objectiveDeck = [{name:"Breach", source:"card_images/objective_breach.png"},
	{name:"Control", source:"card_images/objective_control.png"},
	{name:"Elimination", source:"card_images/objective_elimination.png"},
	{name:"Pivotal Positions", source:"card_images/objective_positions.png"}];

var conditionDeck = [{name:"Clear Conditions", source:"card_images/condition_clear.png"},
	{name:"Dawn", source:"card_images/condition_dawn.png"},
	{name:"Improvised Defenses", source:"card_images/condition_defenses.png"},
	{name:"War Weary", source:"card_images/condition_war_weary.png"}];
	
function resetSetupStatus() {
	setupStatus.currentPlayer = P_BLUE;
	setupStatus.blueTurns = 0;
	setupStatus.redTurns = 0;
}

function changePlayer() {
	// Changes current player 
	if (setupStatus.currentPlayer == P_BLUE) {
		setupStatus.currentPlayer = P_RED;
		setupStatus.blueTurns += 1;
	} else {
		setupStatus.currentPlayer = P_BLUE;
		setupStatus.redTurns += 1;
	}
}

function displayMessage(message) {
	// Displays a message panel
	var messagePanel = document.getElementById("messagePanel");
	messagePanel.innerHTML = message;
	messagePanel.parentNode.style.display = "block";
}

function cardClicked(cardElement) {
	// Handles a card click
	// TODO: only allow eliminating the leftmost card
	cardElement.className += " w3-opacity-max";
	changePlayer();
	if (setupStatus.redTurns < 2) {
		if (setupStatus.currentPlayer == P_BLUE) {
			displayMessage(MSG_BLUE_TURN);
		} else {
			displayMessage(MSG_RED_TURN);
		}
	}
	//else {
		// TODO: define battlefield
	//}
}

function shuffleDeck(deck) {
	// Shuffle deck using Fisher-Yates algorithm
	
	var currentIndex = deck.length;
	var tempValue, i;
	
	while (currentIndex > 1) {
		// Pick a random unshuffled value
		i = Math.floor(Math.random() * currentIndex)
		currentIndex--;
		
		// Swap the value with the current one
		// starting from the end
		tempValue = deck[currentIndex];
		deck[currentIndex] = deck[i];
		deck[i] = tempValue;
	}
}

function shuffleCards() {
	// Shuffles the battle cards and displays them in a 3 by 3 grid
	shuffleDeck(deploymentDeck);
	shuffleDeck(objectiveDeck);
	shuffleDeck(conditionDeck);
}

function generateCardHTML(card) {
	// Generates HTML for displaying a single card
	var cardDiv = document.createElement("div");
	var cardImage = document.createElement("img");
	
	cardDiv.className = DIV_THIRD;
	cardImage.className = CARD_IMAGE;
	cardImage.style = IMAGE_STYLE;
	cardImage.src = card.source;
	cardImage.alt = card.name;
	cardImage.onclick = function(){cardClicked(this)};
	
	cardDiv.appendChild(cardImage);
	card.html = cardDiv;
}

function generateDeckHTML(deck) {
	// Generates HTML for displaying the deck
	var i;
	for (i = 0; i < deck.length; i++) {
		generateCardHTML(deck[i]);
	}
}

function displayDeck(displayElement, deck) {
	// Displays the top three battle cards ready for selection
	var i, numCards = 3;
	displayElement.innerHTML = "";
	
	for (i = 0; i < numCards; i++) {
		displayElement.appendChild(deck[i].html);
	}
}

function displayBattleCards() {
	// Displays the top three battle cards from each deck ready for selection
	displayDeck(document.getElementById("deployments"), deploymentDeck);
	displayDeck(document.getElementById("objectives"), objectiveDeck);
	displayDeck(document.getElementById("conditions"), conditionDeck);
}

function setupCards() {
	resetSetupStatus();
	shuffleCards();
	displayBattleCards();
	displayMessage(MSG_BLUE_TURN);
}

function init() {
	generateDeckHTML(deploymentDeck);
	generateDeckHTML(objectiveDeck);
	generateDeckHTML(conditionDeck);
}

// Initialize html for the cards
init();
