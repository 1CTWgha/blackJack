var deck = [];// will contain card objects
var dealer = {"hand": []};
var player = {"hand": []};
// var board = document.getElementById("#inner");//is to append new div

$(document).ready(function (){
initalizeDeck();
initializeHands();
//check for dealer win = 21
// addCard();
$("#hit").on("click", playerHit);
$("#stay").on("click", playerStay);

$("#reset").on("click", resetGame);
});

function resetGame(){
// document.getElementById(elementID).innerHTML = "";
$("#result").text("");
$("#pvalues").text("");
$("#dvalues").text("");
$("#pcards").html("");
$("#dcards").html("");

initalizeDeck();
initializeHands();
$("#hit").on("click", playerHit);
$("#stay").on("click", playerStay);
$("#reset").on("click", resetGame);

}

function playerStay(){
  while(getHandValue(dealer) < 17){
    dealACard(dealer);
    var val = getHandValue(dealer);
    if (val < 21){
      $("#hit").off();
      $("#stay").off();
      continue;
    }
    else if (val > 21){
      busted(dealer);
      $("#hit").off();
      $("#stay").off();
      return;
    } else {
      winner(dealer);
      $("#hit").off();
      $("#stay").off();
      return;
    }
  }
  if (getHandValue(dealer) >= getHandValue(player)){
    winner(dealer);
  } else {
    winner(player);
  }
      // winner(player);
  // for (var i=0; i<dealer.hand; i++){
  //   var dealerScore = 0;
  //   dealerScore += dealer.hand[i];
  //   console.log(dealerScore);
  //   }
  $("#hit").off();
  $("#stay").off();
  return;
}

function playerHit() {//adding click event to hit me button
// event.preventDefault();//preventing reset of page
  dealACard(player);
  var val = getHandValue(player);
  if (val < 21){
    return;
  }
  else if (val > 21){
    busted(player);
    $("#hit").off();
    $("#stay").off();
    return;
  } else {
    winner(player);
    $("#hit").off();
    $("#stay").off();
    return;
  }
}


function busted(who){
  $("#result").text((((who === player)?"Player":"Dealer") + " is busted."));
}

function winner(who){
  $("#result").text((((who === player)?"Player":"Dealer") + " is the winner."));
}

// function addCard(board){//need to loop through dealer and player cards//add second parameter to show card
//   var cardDiv = $('<div>');//creating a new div element
//   cardDiv.addClass('card');//giving the new div a class of card
//   board.append(cardDiv);//inserting the new div to the end of the board
//   return cardDiv;//return the new card div
// }

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){//loops through cardNames
    var card = cardNames[i];//saves selected card
    deck.push(card);//push cards
  }
}

function getCardValue(cardName){
  var rank = cardName.split("_", 1)[0];//divide argument by "_" only once similar to parsInt; {gives me a string not an array not sure if [] still needed at the end}
  //want strings so that I can evaluate face cards and aces
  var valueOne = parseInt(rank, 10);//makes a number
  if (isNaN(valueOne)){ //if not a number
    if (rank === "ace") {//if first value = a
      return 1;// its an ace and there are two possible values
    } else {//else its not a number or a numeric card
      return 10;// then it must be a face card with a value of 10
    }
  }
    else {// only remaing possibilities are numeric cards
      return valueOne;//so return the numeric card value
    }
}

// function checkCard (){//called when
//   var randNum = Math.floor(Math.random()*51);
//     for (var i =0; i<player.hand.length; i++){
//       if(player.hand[i] === cardNames[randNum]){
//         checkCard();
//       }
//       console.log("in for loop function");
//     }
//     for (var j =0; j<dealer.hand.length; j++){
//       if(dealer.hand[i] === cardNames[randNum]){
//         checkCard();
//       }
//     }
//     player.hand.push(cardNames[randNum]);
//     console.log(player.hand);
// }

function getHandValue(who){
var minTotal = 0;
  for (var i = 0; i<who.hand.length; i++){
    var val = getCardValue(who.hand[i]);
    minTotal += val;

  }
  var maxTotal = minTotal;
  for (var j = 0; j<who.hand.length; j++){
    if (getCardValue(who.hand[j]) === 1 && maxTotal + 10 <= 21) {
        maxTotal += 10;
  }

}
return maxTotal;

}
    // var maxScore = minScore;
    // cards.forEach(function(card){
    //   // checks if setting an ace value to 11 busts the hand. if not, add 10 to value of ace.
    //   if (card.value === 1 && maxScore + 10 <= 21) {
    //     maxScore += 10;



// return minTotal;
// }

function getRandomNumber (min, max){//order maders
  return Math.floor(Math.random()*(max - min + 1));//gives me a random number when values entered
}
// Min + (int)(Math.random() * ((Max - Min) + 1))

function pickACard(){//use above to get a card
  do {//push a card into an array fro every card that is dealt
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

function dealACard(who){//assign values to existing divs
  var where = (who === player)?"#pcards":"#dcards";
  var card = pickACard();
  var div = $("<div>");
  div.addClass("card");
  who.hand.push(card);
  // card = card.substring(0, card.length-4);
  div.html('<img src="img/' + card + '"/>' );
  $(where).append(div);

  if(who === player){
    var value = getHandValue(player);
    $("#pvalues").text(value + "");
  } else {
    var dealerValue = getHandValue(dealer);
    $("#dvalues").text(dealerValue + "");
  }
}

function initializeHands(){//run after initalizeDeck
  dealACard(dealer);
  dealACard(dealer);
  dealACard(player);
  dealACard(player);
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

// function any21(values){
//   for(var i = 0; i<values.length; i++){
//     if(values[i] === 21){
//       return true; //value equales 21
//     }
//   }
//   return false;//value does not equal 21
// }
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
