(() => {
  const cells = document.querySelectorAll('[data-cell]');
  const statusText = document.getElementById('status');
  const resetButton = document.getElementById('reset-button');

  let turn = 'X';
  let board = Array(9).fill(null);
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Number(cell.getAttribute('data-index'));

    if (board[cellIndex] !== null || !gameActive) {
      return;
    }

    updateCell(cell, cellIndex);
    if (checkWin()) {
      statusText.textContent = `Jogador ${turn} venceu! 🎉`;
      gameActive = false;
      disableBoard();
      return;
    }

    if (checkDraw()) {
      statusText.textContent = "Empate! Nenhum vencedor.";
      gameActive = false;
      return;
    }

    changeTurn();
  }

  function updateCell(cell, index) {
    board[index] = turn;
    cell.textContent = turn;
    cell.classList.add('disabled');
  }

  function changeTurn() {
    turn = turn === 'X' ? 'O' : 'X';
    statusText.textContent = `Turno do jogador ${turn}`;
  }

  function checkWin() {
    return winningConditions.some(condition => {
      const [a, b, c] = condition;
      return board[a] === turn && board[b] === turn && board[c] === turn;
    });
  }

  function checkDraw() {
    return board.every(cell => cell !== null);
  }

  function disableBoard() {
    cells.forEach(cell => cell.classList.add('disabled'));
  }

  function resetGame() {
    turn = 'X';
    board = Array(9).fill(null);
    gameActive = true;
    statusText.textContent = `Turno do jogador ${turn}`;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('disabled');
    });
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);

  // Accessibility: Support keyboard interaction (Space or Enter key to mark)
  cells.forEach(cell => {
    cell.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cell.click();
      }
    });
  });
})();
