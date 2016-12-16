var deck = [];
var dealer = {"hand": []};
var player = {"hand": []};

$(document).ready(function (){
initalizeDeck();
initializeHands();
isHand21();
$("#hit").on("click", playerHit);
$("#stay").on("click", playerStay);
$("#reset").on("click", resetGame);
});

function resetGame(){
$("#result").text("");
$("#pcards").html("");
$("#dcards").html("");
$("#hit").attr("disabled", false);
$("#stay").attr("disabled", false);
initalizeDeck();
initializeHands();
isHand21();
}


function isHand21(){
      if(getHandValue(dealer) == 21){
        winner(dealer);
        $("#hit").attr("disabled", true);
        $("#stay").attr("disabled", true);
        return;
      } else if (getHandValue(player) == 21) {
        winner(player);
        $("#hit").attr("disabled", true);
        $("#stay").attr("disabled", true);
        return;
      }
}

function dealACard(who){//assign values to existing divs
  var where = (who === player)?"#pcards":"#dcards";
  var card = pickACard();
  var div = $("<div>");
  div.addClass("card");
  who.hand.push(card);
  div.html('<img src="img/' + card + '"/>' );
  $(where).append(div);
  $("#dcards .card img").eq(1).hide();

  if(who === player){
    var value = getHandValue(player);
    $("#pvalues").text(value);
  } else {
    var dealerValue = getHandValue(dealer);
  }
}


function playerStay(){
  while(getHandValue(dealer) < 17){
    dealACard(dealer);
    var val = getHandValue(dealer);
    if (val < 21){
      $("#hit").attr("disabled", true);
      $("#stay").attr("disabled", true);
      continue;
    }
    else if (val > 21){
      busted(dealer);
      $("#hit").attr("disabled", true);
      $("#stay").attr("disabled", true);
      return;
    }
    else {
      winner(dealer);
      $("#hit").attr("disabled", true);
      $("#stay").attr("disabled", true);
      return;
    }
  }
  if (getHandValue(dealer) >= getHandValue(player)){
    winner(dealer);
  } else {
    winner(player);
  }
  $("#hit").attr("disabled", true);
  $("#stay").attr("disabled", true);
  return;
}

function playerHit() {
  console.log("before", player.hand);
  dealACard(player);
  console.log("after deal a card", player.hand);
  var dealerValue = getHandValue(dealer);
  var val = getHandValue(player);
  console.log("after get ahand value", player.hand, val);

  if (dealerValue == 21){
    winner(dealer);
    $("#hit").attr("disabled", true);
    $("#stay").attr("disabled", true);
  }
  else if (val < 21){
    return;
  }
  else if (val > 21){
    busted(player);
    $("#hit").attr("disabled", true);
    $("#stay").attr("disabled", true);
    return;
  }
}


function busted(who){
  $("#result").text((((who === player)?"Player":"Dealer") + " is busted."));
  $("#dcards .card img").eq(1).show();
}

function winner(who){
  $("#result").text((((who === player)?"Player":"Dealer") + " is the winner."));
  $("#dcards .card img").eq(1).show();
}

function initalizeDeck(){
  for (var i = 0; i<cardNames.length; i++){//loops through cardNames
    var card = cardNames[i];//saves selected card
    deck.push(card);//push cards
  }
}

function getCardValue(cardName){
  var rank = cardName.split("_", 1)[0];//divide argument by "_" only once similar to parsInt; {gives me a string not an array not sure if [] still needed at the end}
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

function getRandomNumber (min, max){//order maders
  return Math.floor(Math.random()*(max - min + 1));//gives me a random number when values entered
}

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

function initializeHands(){//run after initalizeDeck
  dealer.hand=[];
  player.hand=[];
  dealACard(dealer);
  dealACard(dealer);
  dealACard(player);
  dealACard(player);
}

function evaluateHand(who){
  var total = 0;
  for (var i = 0; i<who.hand.length; i++){//loops over the hand and grabs the hand from the who
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
