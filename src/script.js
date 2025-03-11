document.addEventListener("DOMContentLoaded", createGrid);

function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^1-9]/g, '');
        });
        grid.appendChild(input);
    }
}

function getGridValues() {
    return Array.from(document.querySelectorAll('.grid input')).map(input => input.value ? parseInt(input.value) : 0);
}

function setGridValues(values) {
    document.querySelectorAll('.grid input').forEach((input, i) => {
        input.value = values[i] || '';
    });
}

function solveSudoku() {
    let board = chunkArray(getGridValues(), 9);
    if (solve(board)) {
        setGridValues(board.flat());
    } else {
        alert("No solution found.");
    }
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
        let boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        let boxCol = Math.floor(col / 3) * 3 + (i % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}

function chunkArray(arr, size) {
    return Array.from({ length: size }, (_, i) => arr.slice(i * size, i * size + size));
}
