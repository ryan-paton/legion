/*
legion.js

Web application for the setup of battle cards for the skirmish format
in the Star Wars: Legion tabletop miniatures game.

Ryan Paton
2020-07-27
*/

// TODO: may need to preload images

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

// Colors
const COLOR_TEAL = "w3-teal";

var setupStatus = {currentPlayer:P_BLUE, redTurns:0, ready:true};

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
    setupStatus.redTurns = 0;
    setupStatus.ready = true;
}

function resetCardOpacity() {
    var decks = [deploymentDeck, objectiveDeck, conditionDeck];
    var i, j;
    
    for (i = 0; i < decks.length; i++) {
        var currentDeck = decks[i];
        for (j = 0; j < currentDeck.length; j++) {
            currentDeck[j].html.firstChild.className = CARD_IMAGE;
        }
    }
}

function changePlayer() {
    // Changes current player
    if (setupStatus.currentPlayer == P_BLUE) {
        setupStatus.currentPlayer = P_RED;
    } else {
        setupStatus.currentPlayer = P_BLUE;
        setupStatus.redTurns += 1;
    }
}

function displayMessage(message) {
    // Displays a message panel
    var messageText = document.getElementById("messageText");
    messageText.innerHTML = message;
    messageText.parentNode.style.display = "block";
}

function setMessageColor(color) {
    // sets the background color of the message panel
    var messagePanel = document.getElementById("messagePanel");
    
    messagePanel.className = "w3-panel w3-round-large w3-display-container";
    
    if (color == P_BLUE) {
        messagePanel.classList.add("w3-blue");
    } else if (color == P_RED) {
        messagePanel.classList.add("w3-red");
    } else {
        messagePanel.classList.add(color);
    }
}

function isValidCardChoice(cardElement) {
    // Returns true if the selected card is a valid option
    // i.e. is the leftmost non eliminated card and is not the rightmost card
    // TODO: this may not work on older browsers, fix if neccessary
    if (cardElement.classList.contains("w3-opacity-max")) {
        return false;
    }
    
    var cardDiv = cardElement.parentNode
    var rowDiv = cardDiv.parentNode;
    var index = Array.prototype.indexOf.call(rowDiv.children, cardDiv);
    var result = true;
    
    // Check if card is the rightmost one
    if (index == 2) {
        return false
    }
    
    // Check if card is the leftmost one
    if (index != 0) {
        var i = index - 1;
        
        while (i >= 0) {
            if (!rowDiv.children[i].firstChild.classList.contains("w3-opacity-max")) {
                result = false
            }
            i--;
        }
    }
    return result;
}

function updateBattleStatus() {
    // Displays info related to the selection process then checks if it is
    // finished and updates the setup staus
    if (setupStatus.redTurns < 2) {
        if (setupStatus.currentPlayer == P_BLUE) {
            setMessageColor(P_BLUE);
            displayMessage(MSG_BLUE_TURN);
        } else {
            setMessageColor(P_RED);
            displayMessage(MSG_RED_TURN);
        }
    }
    else {
        finishSetup();
    }
}

function finishSetup() {
    // Once battle cards are selected, display and save them
    var cards = listSelectedBattleCards();
    
    setupStatus.ready = false;
    setMessageColor(COLOR_TEAL);
    displayMessage("Battle cards are set");
    hideButton("passButton");
    displayCards(cards);
    saveBattleCards(cards);
}

function clickHandler(cardElement) {
    // Handles a card click
    
    if (setupStatus.ready) {
        if (isValidCardChoice(cardElement)) {
            cardElement.className += " w3-opacity-max";
            changePlayer();
            updateBattleStatus();
        }
    }
}

function cardSingleClicked(cardElement) {
    if (settings.clickOption == SGL_CLICK) {
        clickHandler(cardElement);
    }
}

function cardDoubleClicked(cardElement) {
    if (settings.clickOption == DBL_CLICK) {
        clickHandler(cardElement);
    }
}

function getLeftmostCard(deck) {
    // Returns the leftmost card that wasn't eliminated
    var i = 0;
    var found = false;
    var result = deck[2];
    
    while ((!found) && i < 2) {
        if (!(deck[i].html.firstChild.classList.contains("w3-opacity-max"))) {
            result = deck[i];
            found = true;
        }
        i++;
    }
    return result;
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
    cardImage.onclick = function(){cardSingleClicked(this)};
    cardImage.ondblclick = function(){cardDoubleClicked(this)};
    
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

function listSelectedBattleCards() {
    //returns a list of the 3 selected battle cards
    var cardList = ["", "", ""];
    cardList[0] = getLeftmostCard(deploymentDeck);
    cardList[1] = getLeftmostCard(objectiveDeck);
    cardList[2] = getLeftmostCard(conditionDeck);
    return cardList;
}

function saveBattleCards(cardList) {
    setCardList(cardList);
    saveCardList();
}

function displayCards(cardList) {
    // Displays the three selected battle cards
    clearBattleCards();
    displayDeck(document.getElementById("deployments"), cardList);
}

function clearBattleCards() {
    document.getElementById("deployments").innerHTML = "";
    document.getElementById("objectives").innerHTML = "";
    document.getElementById("conditions").innerHTML = "";
}

function passClicked() {
    // Handles the pass button being clicked
    changePlayer();
    updateBattleStatus();
}

function loadClicked() {
    // Handles the load button being clicked
    setupStatus.ready = false;
    displayCards(battleCardList);
    setMessageColor(COLOR_TEAL);
    displayMessage("Battle cards are set");
    hideButton("passButton");
}

function clearClicked() {
    // Handles the clear button being clicked
    clearCardList();
    hideButton("clearButton");
    hideButton("loadButton");
}

function hideButton(buttonName) {
    // Hides a button with the id buttonName
    document.getElementById(buttonName).style.display = "none";
}

function showButton(buttonName) {
    // Unhides a button with the id buttonName
    document.getElementById(buttonName).style.display = "block";
}

function setupCards() {
    resetSetupStatus();
    resetCardOpacity();
    shuffleCards();
    displayBattleCards();
    showButton("passButton");
    if (hasSaveData) {
        showButton("loadButton");
        showButton("clearButton");
    }
    setMessageColor(P_BLUE);
    displayMessage(MSG_BLUE_TURN);
}

function init() {
    generateDeckHTML(deploymentDeck);
    generateDeckHTML(objectiveDeck);
    generateDeckHTML(conditionDeck);
    
    var list = [deploymentDeck, objectiveDeck, conditionDeck];
    initSaveHandler(list);
    if (hasSaveData) {
        showButton("loadButton");
        showButton("clearButton");
    }
    setMessageColor(COLOR_TEAL);
    displayMessage("Click \"Shuffle Cards\" to begin");
}

// Initialize the app
window.addEventListener("load", init);
