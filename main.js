let value;
let roundArr = [];

function produceScores() {
  let arr = [-1, 0, 1];
  function valueRec() {
    let val = arr[Math.floor(Math.random() * arr.length)];
    return val;
  }
  value = valueRec();
  if (roundArr.length === 10) {
    roundArr = [];
  }
  roundArr.push(value);
  if (roundArr.length === 10) {
    return roundArr;
  } else {
    produceScores();
  }
  return evenChance(roundArr);
}

function evenChance(arr) {
  let sum = arr.reduce((acc, b) => acc + b, 0);
  return checkEven(sum);
}

function checkEven(num) {
  if (num === 0) {
    return roundArr;
  } else {
    produceScores();
  }
}

roundArr = produceScores();

let playerWin = 0;
let playerLoss = 0;
let playerDraw = 0;
let roundNumber = 0;

let userName;
let playerMove;
let computerMove;
let keepLooping = true;
let maxChars = 10;

let computerWinsArr = [
  ["paper", "spock"] /* beats rock */,
  ["scissors", "rock"] /* beats lizard */,
  ["paper", "lizard"] /* beats spock */,
  ["scissors", "lizard"] /* beats paper */,
  ["rock", "spock"] /* beats scissors */,
];
let computerLoseArr = [
  ["scissors", "lizard"] /* loses to rock */,
  ["paper", "spock"] /* loses to lizard */,
  ["scissors", "rock"] /* loses to spock */,
  ["rock", "spock"] /* loses to paper */,
  ["paper", "lizard"] /* loses to scissors */,
];

while (userName === undefined) {
  userName = prompt("What is your name?");
  if (userName.length > 10) {
    alert("Username character limit - 10!");
    userName = undefined;
  }
  if (userName.charAt(0).match(/[A-Z]+/)) {
    console.log("Username is valid");
  } else {
    console.log("Username not valid");
    alert("Username must start with capital letter!");
    userName = undefined;
  }
}

while (keepLooping === true && userName) {
  playerMove = prompt("What is your move?").toLowerCase();

  function yourMove() {
    playerMove = prompt("What is your move?").toLowerCase();
    return playerMove;
  }

  function scores() {
    return `Win count: ${playerWin}
            Loss count: ${playerLoss}
            Draw count: ${playerDraw}
            Number of Rounds: ${roundNumber}
            Player move: ${playerMove}
            Computer move: ${computerMove}
            Array: ${roundArr}
  `;
  }

  // DRAW

  function draw() {
    computerMove = playerMove;
    console.log(computerMove);
    roundNumber++;
    playerDraw++;
    return alert("Hey " + userName + ", you drew!\n" + scores());
  }

  // YOU LOSE

  function computerWins(playerMove) {
    if (playerMove === "rock") {
      computerMove = computerWinsArr[0][Math.floor(Math.random() * 2)];
    } else if (playerMove === "lizard") {
      computerMove = computerWinsArr[1][Math.floor(Math.random() * 2)];
    } else if (playerMove === "spock") {
      computerMove = computerWinsArr[3][Math.floor(Math.random() * 2)];
    } else if (playerMove === "paper") {
      computerMove = computerWinsArr[4][Math.floor(Math.random() * 2)];
    } else {
      computerMove = computerWinsArr[2][Math.floor(Math.random() * 2)];
    }
    roundNumber++;
    playerLoss++;
    console.log(computerMove);
    return alert("Hey " + userName + ", you lost!\n" + scores());
  }

  // YOU WIN

  function playerWins(playerMove) {
    if (playerMove === "rock") {
      computerMove = computerLoseArr[0][Math.floor(Math.random() * 2)];
      console.log(computerMove);
    } else if (playerMove === "paper") {
      computerMove = computerLoseArr[3][Math.floor(Math.random() * 2)];
    } else if (playerMove === "scissors") {
      computerMove = computerLoseArr[4][Math.floor(Math.random() * 2)];
    } else if (playerMove === "lizard") {
      computerMove = computerLoseArr[1][Math.floor(Math.random() * 2)];
    } else {
      computerMove = computerLoseArr[2][Math.floor(Math.random() * 2)];
    }
    roundNumber++;
    playerWin++;
    return alert("Hey " + userName + ", you won!\n" + scores());
  }

  // PLAY AGAIN?
  function playAgain() {
    if (confirm("Do you want to play again?") == true) {
      keepLooping = true;
    } else {
      keepLooping = false;
    }
  }

  roundArr.forEach((e) => {
    if (e < 0) {
      computerWins();
      playAgain();
      yourMove();
    } else if (e > 0) {
      playerWins();
      playAgain();
      yourMove();
    } else {
      draw();
      playAgain();
      yourMove();
    }
  });
}
