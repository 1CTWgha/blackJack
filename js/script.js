var deck = [];// will contain card objects
var dealer = [];
var player = [];

$(document).ready(function (){
initalizeDeck();

});

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){//loops through cardNames
    var card = cardNames[i];//saves selected card
    deck.push(card);//push cards
    // console.log(card);//prints all 52 cards

    var cardValues = getCardValue(cardNames[i]);//saves cardNames value
    deck.push(cardValues);//push value
  }
}

function getCardValue(cardName){//still returns a "string"!!!!!!!???????
  var rank = cardName.split("_", 1)[0];//divide argument by "_" only once similar to parsInt; {gives me a string not an array not sure if [] still needed at the end}
  //want strings so that I can evaluate face cards and aces
  var valueOne = parseInt(rank, 10);
  if (isNaN(valueOne)){ //if not a number
    if (rank[0] === "a"){//if first value = a
      return [1, 11];// its an ace and there are two possible values
    } else {//else its not a number or a numeric card
      return [10];// then it must be a face card with a value of 10
    }
  }
    else {// only remaing possibilities are numeric cards
      return [valueOne];//so return the numeric card value
    }
}

function getRandomNumber (min, max){//order maders
  return Math.floor(Math.random()*(max - min + 1));//gives me a random number when values entered
}
// Min + (int)(Math.random() * ((Max - Min) + 1))

function pickACard(){//use above to get a card
  do {
    var c = getRandomNumber(0, 51);//picks random number in the deck
    if (!deck[c].dealt){//deal the card if it has not been dealt
      deck[c].dealt = true;// if not dealt then set dealt to true(removes card from deck(dealable cards))
      return deck[c];//need to track this better?
      }
    }
    while (true);//when true keep dealing
    //if not true meaning deck[c] has been dealt false (if card is drawn false)
  }

function evaluateHand(){

}

function runPlayer(){//look at and evaluate players hand

 }

function runDealer(){//look at and evaluate dealer hand

 }

 function displayScore(){

 }
