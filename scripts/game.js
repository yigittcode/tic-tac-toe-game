function startNewGame() {
  if(!players[0].name || !players[1].name) {
      alert("Please set custom player names for both players!")
      return;
  }
  IsgameOver = false;
resetGameStatus();

  gameAreaElement.style.display = "block";
  activePlayerNameElement.textContent = players[activePlayer].name;
}
function switchPlayer() {
  switch (activePlayer) {
    case 0:
      activePlayer = 1;
      break;
    case 1:
      activePlayer = 0;
      break;
  }

  // if(activePlayer === 0) {
  //     activePlayer =1;
  // }
  // else{
  //     activePlayer = 0;
  // }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver() {
  //checking the rows for equality
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[i][0] !== 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //checking the columns for equality
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[0][i] !== 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
    //checking the equality from top left to bottom right
    if (
      gameData[0][0] !== 0 &&
      gameData[0][0] === gameData[1][1] &&
      gameData[1][1] === gameData[2][2]
    ) {
      return gameData[0][0];
    }
    //checking the equality from bottom left to top right
    if (
      gameData[2][0] !== 0 &&
      gameData[2][0] === gameData[1][1] &&
      gameData[1][1] === gameData[0][2]
    ) {
      return gameData[2][0];
    }
    if (currentRound === 9) {
      return null; //draw case
    }
    return 0; //don't have a winner yet
  
}

function selectGameField(event) {
  if(IsgameOver) {
    return;
  }
  if (event.target.tagName === "LI") {
    const selectedField = event.target;
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");

    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    gameData[selectedRow][selectedColumn] = players[activePlayer].symbol;
    console.log(gameData);
    const winnerSymbol = checkForGameOver();
    if (winnerSymbol !== 0) {
      endGame(winnerSymbol);
    }
    currentRound++;
    switchPlayer();
  }
}

function endGame(winnerSymbol) {
  gameOverElement.style.display = "block";
  IsgameOver = true;
  if (winnerSymbol !== null) {
    const winnerName = players.find(
      (player) => player.symbol === winnerSymbol
    ).name;
    winnerNameElement.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It s a draw!";
  }

}

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameOverElement.firstElementChild.innerHtml =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

  // cleaning the gameData array
    for(let i = 0; i <=2; i++) {
      for(let j = 0; j<=2; j++) {
        gameData[i][j] = 0;
      } 
    }

    for(let selectibleField of allSelectibleGameFields) {
      selectibleField.textContent = '';
      selectibleField.classList.remove('disabled');
    }

}
