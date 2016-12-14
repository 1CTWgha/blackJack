var deck = [];// will contain card objects
var dealer = {"hand": []};
var player = {"hand": []};
var board = document.getElementById("#inner");//is to append new div to


$(document).ready(function (){
initalizeDeck();
initializeHands();
addCard();

});

function addCard(board, cardToShow){
  var cardDiv = document.createElement('div');//creating a new div element
  cardDiv.className += 'card';//giving the new div a class of card
  board.appendChild(cardDiv);//inserting the new div to the end of the board
  // var cardDiv = $("#inner").addClass("card").appendChild(cardDiv);
  return cardDiv;//return the new card div
}

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){//loops through cardNames
    var card = cardNames[i];//saves selected card
    deck.push(card);//push cards
    // console.log(card);//prints all 52 cards
  }
}

function getCardValue(cardName){
  var rank = cardName.split("_", 1)[0];//divide argument by "_" only once similar to parsInt; {gives me a string not an array not sure if [] still needed at the end}
  //want strings so that I can evaluate face cards and aces
  var valueOne = parseInt(rank, 10);//makes a number
  if (isNaN(valueOne)){ //if not a number
    if (rank[0] === "a") {//if first value = a
      return 1;// its an ace and there are two possible values
    } else {//else its not a number or a numeric card
      return 10;// then it must be a face card with a value of 10
    }
  }
    else {// only remaing possibilities are numeric cards
      return valueOne;//so return the numeric card value
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

function hideFirstDealerCard(){//gets card from makes card visible
  // once cards are on the page.
  // use jQuery to select the first dealer card and apply a special class
  // to it so it's hidden.
  // $().addClass("hidden-card");
}

function initializeHands(){//run after initalizeDeck
  dealer.hand.push(pickACard());//push and turn card over
  dealer.hand.push(pickACard());//push and leave card not turned over
  player.hand.push(pickACard());//push and turn card over
  player.hand.push(pickACard());//push and turn card over
}

function evaluateHand(who){
  var total = 0;
  for (var i = 0; i<who.hand.length; i++){//loops over the hand and grabs the hand from the who
    //need to figure out how to pull in the hand of who
    var value = getCardValue(who.hand[i]);
    total += value;
  }
  return total;
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


// function hitMe(){
//   $("#hit").on("click", function() {//adding click event to hit me button
//   event.preventDefault();//preventing reset of page
//   var values = evaluateHand(player);//returns the value from evaluateHand(players score after they get another card)
//
// });
// }
//
// function stayMe(){
//   $("#stay").on("click", function() {//adding click event to hit me button
//   event.preventDefault();//preventing reset of page
//   return evaluateHand(player);//returns the value from evaluateHand(no more cards)
//
// });
// }

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
