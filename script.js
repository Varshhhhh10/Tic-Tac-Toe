class TicTacToe {
    constructor() {
      this.board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ];
      this.currentPlayer = 'X';
    }
  
    // Make a move if the cell is empty
    makeMove(row, col) {
      if (this.board[row][col] === '-') {
        this.board[row][col] = this.currentPlayer;
        return true;
      }
      return false;
    }
  
    // Switch to the other player
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  
    // Check for a winner
    checkWin() {
      const winningCombos = [
        // Rows
        [ [0, 0], [0, 1], [0, 2] ],
        [ [1, 0], [1, 1], [1, 2] ],
        [ [2, 0], [2, 1], [2, 2] ],
        // Columns
        [ [0, 0], [1, 0], [2, 0] ],
        [ [0, 1], [1, 1], [2, 1] ],
        [ [0, 2], [1, 2], [2, 2] ],
        // Diagonals
        [ [0, 0], [1, 1], [2, 2] ],
        [ [0, 2], [1, 1], [2, 0] ]
      ];
  
      return winningCombos.some(combo =>
        combo.every(([row, col]) => this.board[row][col] === this.currentPlayer)
      );
    }
  
    getCurrentPlayer() {
      return this.currentPlayer;
    }
  
    resetGame() {
      this.board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ];
      this.currentPlayer = 'X';
    }
  }
  
  const game = new TicTacToe();
  const boardElement = document.getElementById('game-board');
  const statusElement = document.getElementById('status');
  
  // Render the board dynamically
  function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.createElement('div');
        cell.textContent = game.board[row][col] !== '-' ? game.board[row][col] : '';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', handleMove);
        boardElement.appendChild(cell);
      }
    }
  }
  
  // Handle player's move
  function handleMove(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
  
    if (game.makeMove(row, col)) {
      if (game.checkWin()) {
        statusElement.textContent = `Player ${game.getCurrentPlayer()} Wins!`;
        boardElement.innerHTML = ''; // Clear the board to prevent further moves
        return;
      }
  
      game.switchPlayer();
      statusElement.textContent = `Current Player: ${game.getCurrentPlayer()}`;
      renderBoard();
    }
  }
  
  // Initialize the game board
  renderBoard();
  