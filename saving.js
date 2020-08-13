/*
saving.js

saving and loading of battle card setups for Star Wars: Legion

Ryan Paton
2020-08-13
*/

const CARD_SAVE_NAME = "battlecards";

var hasSaveData = false;
var battleCardList = [null, null, null];
var battleDeckList;

function loadCardList() {
    var names;
    var saveData = localStorage.getItem(CARD_SAVE_NAME);
    
    if (saveData != null) {
        hasSaveData = true;
        names = JSON.parse(saveData);
        createListFromNames(names);
    }
}

function saveCardList() {
    var names = [null, null, null];
    var i, saveData;
    
    for (i = 0; i < names.length; i++) {
        names[i] = battleCardList[i].name;
    }
    
    saveData = JSON.stringify(names);
    localStorage.setItem(CARD_SAVE_NAME, saveData);
}

function setCardList(listOfCards) {
    battleCardList = listOfCards;
    hasSaveData = true;
}

function getCardByName(cardName) {
    // Returns the reference to a card with the name equal to the string cardName
    var card;
    var deck, i, j;
    
    for (i = 0; i < battleDeckList.length; i++) {
        deck = battleDeckList[i];
        for (j = 0; j < deck.length; j++) {
            if (deck[i].name == cardName) {
                card = deck[i];
            }
        }
    }
    return card;
}

function createListFromNames(names) {
    // Builds the list of card references from a list of name strings
    var i;
    for (i = 0; i < names.length; i++) {
        battleCardList[i] = getCardByName(names[i]);
    }
}

function initSaveHandler(listOfDecks) {
    // Initalises the save handler
    battleDeckList = listOfDecks;
    loadCardList();
}
