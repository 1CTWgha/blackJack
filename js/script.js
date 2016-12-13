var deck = [];// will contain card objects
var dealer = {"hand": []};//
var player = {"hand": []};//

$(document).ready(function (){
initalizeDeck();
initializeHands();

//runPlayer();
//runDealer();
});

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){//loops through cardNames
    var card = cardNames[i];//saves selected card
    deck.push(card);//push cards
    // console.log(card);//prints all 52 cards

    var visibility = false;//not working yet????? needs to call to the card

    var cardValues = getCardValue(cardNames[i]);//saves cardNames value
    deck.push(cardValues);//push value
  }
}

function getCardValue(cardName){
  var rank = cardName.split("_", 1)[0];//divide argument by "_" only once similar to parsInt; {gives me a string not an array not sure if [] still needed at the end}
  //want strings so that I can evaluate face cards and aces
  var valueOne = parseInt(rank, 10);//makes a number
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

function makeCardVisible(card){//gets card from makes card visible
  card.visibility = true;//make visibility true turn card over
  return card;//returns card
}

function initializeHands(){//run after initalizeDeck
  dealer.hand.push(makeCardVisible(pickACard()));//push and turn card over
  dealer.hand.push(pickACard());//push and leave card not turned over
  player.hand.push(makeCardVisible(pickACard()));//push and turn card over
  player.hand.push(makeCardVisible(pickACard()));//push and turn card over
}

function evaluateHand(who){
  var total = 0;
  for (var i = 0; i<who.hand.length; i++){//loops over the hand and grabs the hand from the who
    //need to figure out how to pull in the hand of who
    if(who.hand[i].values.length == 1){ total += who.hand[i].values[0]; }//still need to figure out how to pass in the hand to the who???
      var aceCount = countAce(who.hand[i]);//calling countAce function to determine number of aces
      if(aceCount === 0){
        return total;
      }
      else return [ total + 10 + aceCount ];//count the total plus the ace
      //and any additional ace which will be a 1
  }
}

function countAce(hand){//pass in the hand
  var aceCount = 0;
  for(var i =0; i<hand.length; i++){//loop through based off of the length of the hand
    if(hand[i].values.length > 1){//if more than one add another
      aceCount++;//add another ace
    }
  }
  return aceCount;//return the number of aces
}
// function calculateScore(cards) {
//     var minScore = 0;
//     cards.forEach(function(card){
//       minScore += card.value;
//     });
//
//     var maxScore = minScore;
//     cards.forEach(function(card){
//       // checks if setting an ace value to 11 busts the hand. if not, add 10 to value of ace.
//       if (card.value === 1 && maxScore + 10 <= 21) {
//         maxScore += 10;
//       }
//     });
//     console.log("maxscore", maxScore);
//     return maxScore;
//   }


function hitMe(){
  $("#hit").on("click", function() {//adding click event to hit me button
  event.preventDefault();//preventing reset of page
  var values = evaluateHand(player);//returns the value from evaluateHand(players score after they get another card)

});
}

function stayMe(){
  $("#stay").on("click", function() {//adding click event to hit me button
  event.preventDefault();//preventing reset of page
  return evaluateHand(player);//returns the value from evaluateHand(no more cards)

});
}

// function runPlayer(){//look at and evaluate players hand
//   if(=21){
//     alert("player wins");
//   } else {
//     $("#hit").on("click", hitMe());
//     $("stay").on("click", stayMe());
//     //add click events to the hit and stay buttons
//   }
//  }

// function runDealer(){//look at and evaluate dealer hand
//   if(dealerhand21){
//     //announce player winner
//   } else {
//     //add click events to the hit and stay buttons
//   }
//  }
