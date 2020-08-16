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

function clearCardList() {
    localStorage.removeItem(CARD_SAVE_NAME);
    hasSaveData = false;
}

function getCardByName(cardName) {
    // Returns the reference to a card with the name equal to the string cardName
    var card, deck;
    var i = 0;
    var found = false;
    
    while ((!found) && i < battleDeckList.length) {
        var j = 0;
        deck = battleDeckList[i];
        while ((!found) && j < deck.length) {
            if (deck[j].name == cardName) {
                card = deck[i];
                found = true;
            }
            j++;
        }
        i++;
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
