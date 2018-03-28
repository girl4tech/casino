//user can enter amount bet
//user can pick a number or color
//user can press spin to play
//if win or lose display message
//change total based on result

//enter Amount
//input - get the color
//to play
//clcik function to Spin
//choices
//each option needs a value
//total needs to update when game is played


var total = 100;
var newTotal = 100;
var colorRed = 7;
var colorBlack = 8;
// var finalTotal = 0;
var oneBut = document.getElementById("one");
var twoBut = document.getElementById("two");
var threeBut = document.getElementById("three");
var fourBut = document.getElementById("four");
var fiveBut = document.getElementById("five");
var sixBut = document.getElementById("six");


document.getElementById("spin").onclick = roulette;
//document.getElementById("amount").onclick = amountBet;



function roulette() {
	var amount = document.getElementById("amount").value;
	total -= amount;
	if (oneBut.clicked = true) {
		var num = Math.round(Math.random() * 8);
		if (1 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			console.log(newTotal);
			document.getElementById("winLose").innerHTML = "You Win!";
		} else {
			newTotal -= amount * 2;
			total = newTotal;
			console.log(newTotal);
			document.getElementById("winLose").innerHTML = "You Lose!";

		}
	} else if (twoBut.clicked = true) {
		if (2 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
		}
	} else if (threeBut.clicked = true) {
		if (3 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
		}
	} else if (fourBut.clicked = true) {
		if (4 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
		} else {
			newTotal -= 5
			document.getElementById("winLose").innerHTML = "You Lose!";
		}
	} else if (fiveBut.clicked = true) {
		if (5 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
		}
	} else if (sixBut.clicked = true) {
		if (6 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
		}
	}
	document.getElementById('total').innerHTML = newTotal;
};