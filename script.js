var playerOneUp = document.querySelector("#oppLeft");
var playerTwoUp = document.querySelector("#oppRight");
var playerOneDown = document.querySelector("#playerLeft");
var playerTwoDown = document.querySelector("#playerRight");
var reset = document.querySelectorAll("button")[0];
var divide = document.querySelectorAll("button")[1];
playerTwo = document.querySelectorAll("thead td")[1];
playerOne = document.querySelectorAll("thead td")[0];
playerOneName = document.querySelector("#playerOneName");
playerTwoName = document.querySelector("#playerTwoName");

var i = 0;
button = [playerOneUp, playerOneDown, playerTwoUp, playerTwoDown]
resetGame();

// playerOneName.textContent = prompt("Enter player one Name: ");
// playerTwoName.textContent = prompt("Enter player two Name: ");

function display() {
	for (i = 0; i < button.length; i++) {
		button[i].textContent = String(button[i].value);
	};
}

function checkWin() {
	if (playerOneUp.value === 0 && playerOneDown.value === 0) {
		alert("Player Two Wins!");
		resetGame();
	}
	else if (playerTwoUp.value === 0 && playerTwoDown.value === 0) {
		alert("Player One Wins!");
		resetGame();
	}
};

function resetGame() {
	for (i = 0; i < button.length; i++) {
		button[i].value = 1;
	}
	currentClick = null;
	currentNum = 1;
	currentTurn = 0;
	selectedClassCount = 0;
	readyForNext = false;
	display();
	console.log(currentTurn);
};

function highlight() {
	if (currentTurn === 0) {
		playerTwo.classList.remove("highlight");
		playerOne.classList.add("highlight");
	}
	else if (currentTurn === 1) {
		playerOne.classList.remove("highlight");
		playerTwo.classList.add("highlight");
	}
};

function checkClick(player) {
	if (currentTurn === 0 && readyForNext !== true && (player === playerTwoUp || player === playerTwoDown)) {
		return false;
	}
	else if (currentTurn === 1 && readyForNext !== true && (player === playerOneUp || player === playerOneDown)) {
		return false;
	}
	else if (currentTurn === 0 && readyForNext !== false && (player === playerOneUp || player === playerOneDown)) {
		return false;
	}
	else if (currentTurn === 1 && readyForNext !== false && (player === playerTwoUp || player === playerTwoDown)) {
		return false;
	}
	else {
		return true;
	}
};

for (i = 0; i < button.length; i++) {
	button[i].addEventListener("click", function() {
		if (checkClick(this)) {
			if (this.value === 0) {
				alert("Cannot click on 0 value!");
			}
			else if (readyForNext === false) {
				previousValue = this.value;
				readyForNext = true;
			}
			else if (readyForNext === true) {
				this.value = (this.value + previousValue) % 5;
				display();
				readyForNext = false;
				currentTurn = (currentTurn + 1) % 2;
			}
			checkWin();
			highlight();
			console.log(currentTurn);
		}
	});
}

reset.addEventListener("click", function() {
	resetGame();
	alert("Game Restarted!");
});

divide.addEventListener("click", function() {
	if (currentTurn === 0) {
		totalSum = (playerOneUp.value + playerOneDown.value);
		playerOneUp.value = Math.floor((totalSum) / 2);
		playerOneDown.value = (totalSum) - playerOneUp.value;
		display();
	}
	else if (currentTurn === 1) {
		totalSum = (playerTwoUp.value + playerTwoDown.value);
		playerTwoUp.value = Math.floor((totalSum) / 2);
		playerTwoDown.value = (totalSum) - playerTwoUp.value;
		display();
	}
});