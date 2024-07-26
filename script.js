const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const checkWinner = () => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.every(cell => cell) ? 'Draw' : null;
};

const handleClick = (e) => {
    const index = Array.from(cells).indexOf(e.target);
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

cells.forEach(cell => cell.addEventListener('click', handleClick));