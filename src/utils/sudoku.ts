
import { Board,createBoard } from "../types";

export const generateSudokuBoard = (difficulty: number): Board => {
    const board = createBoard(); // Create an empty board
    solveSudoku(board); // Solve it to create a fully solved board

    const totalCells = 81;
    const cellsToRemove = Math.floor(totalCells * difficulty); // Difficulty-based cells to remove

    // Set to keep track of removed cells
    const removedCells = new Set<string>();

    while (removedCells.size < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        const cellKey = `${row}-${col}`;
        if (!removedCells.has(cellKey) && board[row][col]?.value !== null) {
            const backup = board[row][col].value; // Backup the cell value
            board[row][col].value = null; // Remove the cell
            board[row][col].editable = true; // Mark it as editable

            if (hasUniqueSolution(board)) {
                removedCells.add(cellKey); // Keep the removal if unique
            } else {
                // Restore the cell if uniqueness fails
                board[row][col].value = backup;
                board[row][col].editable = false;
            }
        }
    }

    return board;
};

// Check if the puzzle has a unique solution
function hasUniqueSolution(board: Board): boolean {
    return countSolutions(deepCloneBoard(board)) === 1;
}

// Count the number of solutions to the puzzle
function countSolutions(board: Board): number {
    let solutionCount = 0;

    function helper(board: Board, row = 0, col = 0): boolean {
        if (row === 9) {
            solutionCount++;
            return solutionCount > 1; // Stop early if more than one solution is found
        }

        if (col === 9) {
            return helper(board, row + 1, 0);
        }

        if (board[row][col]?.value !== null) {
            return helper(board, row, col + 1);
        }

        for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col].value = num;
                if (helper(board, row, col + 1)) {
                    board[row][col].value = null;
                    return true;
                }
                board[row][col].value = null;
            }
        }

        return false;
    }

    helper(board);
    return solutionCount;
}

// Deep clone the board to avoid mutations
function deepCloneBoard(board: Board): Board {
    return board.map(row =>
        row.map(cell => ({
            value: cell.value,  // Ensures that the value is properly copied
            editable: cell.editable ?? false, // Ensures editable flag is set correctly
        }))
    ) as Board;
}

// Solve Sudoku using backtracking
export function solveSudoku(board: Board, row = 0, col = 0): boolean {
    if (row === 9) {
        return true;
    }

    if (col === 9) {
        return solveSudoku(board, row + 1, 0);
    }

    if (board[row][col]?.value !== null) {
        return solveSudoku(board, row, col + 1);
    }

    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of numbers) {
        if (isValid(board, row, col, num)) {
            board[row][col].value = num;
            board[row][col].editable = false;
            if (solveSudoku(board, row, col + 1)) {
                return true;
            }
            board[row][col].value = null;
            board[row][col].editable = true;
        }
    }

    return false;
}


const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
    return array;
}

// Check if a number placement is valid
export function isValid(board: Board, row: number, col: number, num: number): boolean {
    // check if the number is already in the row
    for (let i = 0; i < 9; i++) {
        if (board[row]?.[i]?.value === num) {
            return false;
        }
    }

    // check if the number is already in the column
    for (let i = 0; i < 9; i++) {
        if (board[i]?.[col]?.value === num) {
            return false;
        }
    }

    // check if the number is already in the 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow]?.[j + startCol]?.value === num) {
                return false;
            }
        }
    }

    return true;
}

// Check if the board is a valid Sudoku solution
export const checkSudokuSolution = (board: Board): boolean => {
        
    // Check if all cells are filled first
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = board[row][col].value;
            if (num === null) {
                return false; // If any cell is empty, the solution is not valid
            }
        }
    }

    // Now validate Sudoku rules
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = board[row][col].value;

            if (num !== null) {
                // Temporarily clear the cell to avoid conflict with itself
                board[row][col].value = null;

                // Validate the current number using the existing `isValid` function
                if (!isValid(board, row, col, num)) {
                    // Restore the original value if invalid
                    board[row][col].value = num;
                    return false;
                }

                // Restore the original value after the check
                board[row][col].value = num;
            }
        }
    }

    return true; // If all checks pass, the solution is correct
};
  