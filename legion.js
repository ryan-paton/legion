/*
legion.js

Web application for the setup of battle cards for the skirmish format
in the Star Wars: Legion tabletop miniatures game.

Ryan Paton
2020-07-27
*/

// TODO: may need to preload images

var deploymentImageSource = ["card_images/deployment_battle_lines.png",
	"card_images/deployment_faceoff.png",
	"card_images/deployment_flanking.png",
	"card_images/deployment_meeting.png"];

var objectiveImageSource = ["card_images/objective_breach.png",
	"card_images/objective_control.png",
	"card_images/objective_elimination.png",
	"card_images/objective_positions.png"];

var conditionImageSource = ["card_images/condition_clear.png",
	"card_images/condition_dawn.png",
	"card_images/condition_defenses.png",
	"card_images/condition_war_weary.png"];

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
	shuffleDeck(deploymentImageSource);
	shuffleDeck(objectiveImageSource);
	shuffleDeck(conditionImageSource);
}

function generateCardHTML(cardSource) {
	// Returns HTML for displaying a single card
	var html = "<div class=\"w3-card-4\"><img src=\"" +
		cardSource + "\" alt=\"card\"/></div>";
	return html;
}

function generateDeckHTML(deck) {
	// Returns HTML for displaying the top three cards from the deck
	var html = generateCardHTML(deck[0]) + generateCardHTML(deck[1]) +
		generateCardHTML(deck[2]);
	return html;
}

function displayBattleCards() {
	// Displays the top three battle cards from each deck ready for selection
	document.getElementById("deployments").innerHTML = generateDeckHTML(deploymentImageSource);
	document.getElementById("objectives").innerHTML = generateDeckHTML(objectiveImageSource);
	document.getElementById("conditions").innerHTML = generateDeckHTML(conditionImageSource);
}

function setupCards() {
	shuffleCards();
	displayBattleCards();
}
