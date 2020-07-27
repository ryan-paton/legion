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

function shuffleDeck(array) {
	// Shuffle deck using Fisher-Yates algorithm TODO: fix algorith, taken from incorrect source
	
	var current = array.length;
	var val, i;
	
	while (current > 0) {
		// Pick a random unshuffled value
		i = Math.floor(Math.random() * current)
		current--;
		
		// Swap the value with the current one
		// starting from the end
		val = array[current];
		array[current] = array[i];
		array[i] = val;
	}
	
	return array;
}

function shuffleCards() {
	// Shuffles the battle cards and displays them in a 3 by 3 grid
	
}

