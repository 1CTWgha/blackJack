var deck = [];// will contain card objects
var dealer = [];
var player = [];

$(document).ready(function (){
initalizeDeck();

});

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){
    var card = cardNames[i];
    deck.push(card);//push cards
  }
}

// var Values = parseint(cardNames.split("_", 10)[0]);
//
// function getRandomNumber (max, min){//from google
//   return math.floor(math.random()*(max - min + 1))+1);
// }
