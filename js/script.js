var deck = [];// will contain card objects
var dealer = [];
var player = [];

$(document).ready(function (){
initalizeDeck();

});

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){//loops through cardNames
    var card = cardNames[i];//saves selected card
    var cardValues = getCardValue(cardNames[i]);
    deck.push(card);//push cards
    deck.push(cardValues);
    // console.log(card);//prints all 52 cards
  }
}

function getCardValue(cardName){
  var rank = cardName.split("_", 1)[0];//divide argument by "_" only once similar to parsInt; {gives me a string not an array}
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




// function getRandomNumber (max, min){//from google
//   return math.floor(math.random()*(max - min + 1))+1);
// }
