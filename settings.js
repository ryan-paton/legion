/*
setting.js

setting for the Legion battle card app

Ryan Paton
2020-08-18
*/

// Constants
const SGL_CLICK = "single";
const DBL_CLICK = "double";

var settings = {clickOption:SGL_CLICK};

function radioClicked(value) {
    // Sets the clickOption setting
    settings.clickOption = value;
}
