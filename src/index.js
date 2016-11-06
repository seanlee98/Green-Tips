/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing green tips.
 */
var TIPS = [
    "Eat one less red meat a week, it'll save up to 800 gallons of water per year!",
    "Did you know the average faucet releases 3 gallons of water per minute? So turn off those damn taps!",
    "Did you know recycling one aluminum can saves enough energy to run a TV for 3 hours?",
    "Maybe you should bike to work instead of driving, since it can reduce more than 90 percent of greenhouse gas emissions.",
    "Go naked... When shopping, look for products with minimal to no packaging. Or atleast out of recycled materials"  
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Tip = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Tip.prototype = Object.create(AlexaSkill.prototype);
Tip.prototype.constructor = Tip;

Tip.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Tip.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewTipRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Tip.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Tip.prototype.intentHandlers = {
    "GetNewTipIntent": function (intent, session, response) {
        handleNewTipRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a green tip or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new tip from the list and returns to the user.
 */
function handleNewTipRequest(response) {
    // Get a random green tip from the list
    var tipIndex = Math.floor(Math.random() * TIPS.length);
    var randomTip = TIPS[tipIndex];

    // Create speech output
    var speechOutput = "Here's your tip: " + randomTip;
    var cardTitle = "Your Tip";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var tip = new Tip();
    tip.execute(event, context);
};
