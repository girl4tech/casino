const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const trash = document.getElementsByClassName("fa-trash");
const twizzlers = document.getElementById('twizzlers');
const doritos = document.getElementById('doritos');
const crunch = document.getElementById('crunch');
const fanta = document.getElementById('fanta');
const pretzels = document.getElementById('pretzels');
const button = document.getElementById('myButton');

Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function() {
    element.classList.add("complete")
    const snack = this.parentNode.parentNode.childNodes[1].innerText
    // const count = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    console.log(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'snack': snack,
          // 'count': count,
          'thumbUp': thumbUp


        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {

        window.location.reload(true)
      })
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const snack = this.parentNode.parentNode.childNodes[1].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': snack
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

/*twizzlers.addEventListener('click', function() {
document.getElementById('payMsg').innerHTML = 'You chose twizzlers!'
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText) - 1
  fetch('messages-decrease', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'twizzlers',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })

});

doritos.addEventListener('click', function() {
  document.getElementById('payMsg').innerHTML = 'You chose doritos!'
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText) - 1
  fetch('messages-decrease', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'doritos',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })

});

crunch.addEventListener('click', function() {
  document.getElementById('payMsg').innerHTML = 'You chose crunch!'
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText) - 1
  fetch('messages-decrease', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'crunch',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })

});


fanta.addEventListener('click', function() {
  //  const snack = this.parentNode.parentNode.childNodes[1].innerText
  //  debugger;
  document.getElementById('payMsg').innerHTML = 'You chose fanta!'
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText) - 1
  fetch('messages-decrease', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'fanta',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })

});

pretzels.addEventListener('click', function() {
  document.getElementById('payMsg').innerHTML = 'You chose pretzels!'
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText) - 1
  fetch('messages-decrease', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'pretzels',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })

});


button.addEventListener('click', function(e) {

  document.getElementById('payMsg').innerHTML = 'Thank you for purchasing!';
  fetch('/clicked', {method: 'POST'})
      .then(function(response) {
        if(response.ok) {
          console.log('Click was recorded');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  });



setInterval(function() {
  fetch('/clicks', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      document.getElementById('counter').innerHTML = `We raised  ${data.length} dollars!`;
    })
    .catch(function(error) {
      console.log(error);
    });
}, 1000);*/
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
function win(){
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText)
    console.log(thumbUp)
  fetch('messages', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'Wins',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })
}
function loss(){
  const thumbUp =
    parseInt(document.getElementById("makeGreen").innerText) + 1
  fetch('messages-decrease', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'snack': 'Losses',
        'thumbUp': thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()

    })
    .then(data => {

      window.location.reload() //page reload (another get request is triggered)
    })
}

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
      win();
		} else {
			newTotal -= amount * 2;
			total = newTotal;
			console.log(newTotal);
			document.getElementById("winLose").innerHTML = "You Lose!";
      loss();
		}
	} else if (twoBut.clicked = true) {
		if (2 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
      win();
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
      loss();
		}
	} else if (threeBut.clicked = true) {
		if (3 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
        win();
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
      loss();
		}
	} else if (fourBut.clicked = true) {
		if (4 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
        win();
		} else {
			newTotal -= 5
			document.getElementById("winLose").innerHTML = "You Lose!";
      loss();
		}
	} else if (fiveBut.clicked = true) {
		if (5 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
        win();
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
      loss();
		}
	} else if (sixBut.clicked = true) {
		if (6 === num) {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Win!";
        win();
		} else {
			newTotal += amount * 2;
			total = newTotal - amount;
			document.getElementById("winLose").innerHTML = "You Lose!";
      loss();
		}
	}
	document.getElementById('total').innerHTML = newTotal;
};
