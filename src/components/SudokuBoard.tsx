import { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { Board, Cell as CellType,createBoard } from '../types';
import NumberSelector from './NumberSelector';
import { isValid,solveSudoku,extractTextFromImage } from '../utils/sudoku';
import {preprocessImage} from '../utils/opencvHelper'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../App.css';
  

const SudokuBoard = ({ board, setBoard ,isNewBoard }: { board: Board; setBoard: React.Dispatch<React.SetStateAction<Board>>; isNewBoard:boolean }) => {

  const [selectedCell, setSelectedCell] = useState<CellType | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [invalidCells, setInvalidCells] = useState<Set<string>>(new Set()); // Track invalid cells
  const [hintCells, setHintCells] =  useState<Set<string>>(new Set()); 
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHintHovered, setIsHintHovered] = useState <boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  // Ref to hold the solved board across re-renders
  const solvedBoardRef = useRef<Board | null>(null);

  useEffect(() => {
    if (!solvedBoardRef.current || isNewBoard) {
      // Solve the board once and store the result in the ref
      const boardCopy = JSON.parse(JSON.stringify(board));
      solveSudoku(boardCopy);
      solvedBoardRef.current = boardCopy;
      
    }
  }, [board,isNewBoard]);

  const handleSolve = () => {
    if (solvedBoardRef.current) {
      setBoard(solvedBoardRef.current); // Use the solved board
    } else {
      console.error("Solved board is not available.");
    }
  };

  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const image = new Image();
    image.src = URL.createObjectURL(file);
  
    image.onload = async () => {
      try {
        const canvas = preprocessImage(image);
        document.body.appendChild(canvas);

        const extractedText = await extractTextFromImage(canvas);
        console.log("Extracted Text:", extractedText);
        const boardFromImage = parseExtractedTextToBoard(extractedText);
  
        //|| boardFromImage.flat().some(cell => cell.value === null)
        if (!boardFromImage) {
          setFeedbackMessage(
            "Unable to extract a complete Sudoku board from the image. Please try again with a clearer image."
          );
          setTimeout(() => setFeedbackMessage(null), 3000);
          return;
        }
  
        setFeedbackMessage(null); // Clear feedback message
        setBoard(boardFromImage);
      } catch (error) {
        console.error("Error during image upload or processing:", error);
        setFeedbackMessage(
          "An error occurred while processing the image. Please try again."
        );
        setTimeout(() => setFeedbackMessage(null), 3000);
      }
    };
  
    image.onerror = () => {
      setFeedbackMessage("Failed to load the image. Please try again.");
      setTimeout(() => setFeedbackMessage(null), 3000);
    };
  };
  
  // const parseExtractedTextToBoard = (text: string): Board => {
  //   const lines = text.split('\n').filter(line => line.trim() !== ""); // Remove empty lines
  //   const board = createBoard();
  
  //   lines.forEach((line, rowIndex) => {
  //     const numbers = line.trim().split(/\s+/); // Split on spaces
  //     numbers.forEach((num, colIndex) => {
  //       const value = parseInt(num, 10);
  
  //       // Fill with 0 if the value is invalid or the cell is empty
  //       if (rowIndex < 9 && colIndex < 9) {
  //         board[rowIndex][colIndex].value = !isNaN(value) ? value : 0;
  //         board[rowIndex][colIndex].editable = value === 0; // Mark zeros as editable
  //       }
  //     });
  //   });
  
  //   return board;
  // };
  
  const parseExtractedTextToBoard = (text: string): Board => {
    const lines = text.split('\n').filter(line => line.trim() !== ""); // Remove empty lines
    const board = createBoard();
  
    lines.forEach((line, rowIndex) => {
      const numbers = line.trim().split(/\s+/); // Split on spaces
      numbers.forEach((num, colIndex) => {
        if (rowIndex < 9 && colIndex < 9) {
          const value = parseInt(num, 10);
  
          if (!isNaN(value) && value !== 0) {
            board[rowIndex][colIndex].value = value;
            board[rowIndex][colIndex].editable = false; // Non-zeros are not editable
          } else {
            board[rowIndex][colIndex].value = null; // Void cells are represented as null
            board[rowIndex][colIndex].editable = true;
          }
        }
      });
    });
  
    return board;
  };  

  const calculateHighlightedCells = (cell: CellType) => {
    const newHighlightedCells = new Set<string>();
    const { row, col } = cell;
    for (let i = 0; i < 9; i++) {
      newHighlightedCells.add(`${row},${i}`);
      newHighlightedCells.add(`${i},${col}`);
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        newHighlightedCells.add(`${r},${c}`);
      }
    }
    return newHighlightedCells;
  };

  const handleCellClick = (cell: CellType) => {
    if (!cell.editable) return;

    if (selectedCell?.row === cell.row && selectedCell?.col === cell.col) {
      setSelectedCell(null);
      setHighlightedCells(new Set());
      return;
    }

    setSelectedCell(cell);
    setHighlightedCells(calculateHighlightedCells(cell));
  };

  const getHint = () => {
    let hintFound = false;
    const boardCopy = JSON.parse(JSON.stringify(board)); // Deep copy

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (solvedBoardRef.current) {
                const correctValue = solvedBoardRef.current[row][col].value;
                const currentValue = boardCopy[row][col].value;

                // Check if the cell is empty or has an incorrect value
                if (currentValue === null || currentValue !== correctValue) {
                    boardCopy[row][col].value = correctValue;
                    boardCopy[row][col].editable = false; // Mark as non-editable

                    const hintKey = `${row},${col}`;
                    setHintCells(prev => new Set(prev).add(hintKey));

                    // Set a timeout to remove the highlight after 1 second
                    setTimeout(() => {
                        setHintCells(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(hintKey); // Remove the hint key
                            return newSet;
                        });
                    }, 500);

                    hintFound = true;
                    break; // Exit the inner loop
                }
            }
        }
        if (hintFound) break; // Exit the outer loop
    }

    if (hintFound) {
        setBoard(boardCopy);
    }

    return hintFound;
};


  const handleNumberSelect = (number: number) => {
    if (selectedCell && selectedCell.editable) {
      const updatedBoard = [...board];
      if (isValid(board, selectedCell.row, selectedCell.col, number)) {
        setError(null);
        setInvalidCells(new Set()); // Clear invalid cells
        updatedBoard[selectedCell.row][selectedCell.col].value = number;
        setBoard(updatedBoard);
      } else {
        const invalidKey = `${selectedCell.row},${selectedCell.col}`;
        setInvalidCells(new Set([invalidKey])); // Highlight the invalid cell
        setError("The provided number does not respect Sudoku rules");
        setTimeout(() => setError(null), 3000); // Clear the error after 3 seconds

      }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">

     <h1 className="text-2xl font-bold text-gray-700 mb-1 flex items-center space-x-2">
        <span>Sudoku</span>
        <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={
              handleSolve // Update the board with the solved version
            } 
            className="relative flex items-center justify-center  rounded-md text-white z-10">
            <i className="fas fa-puzzle-piece text-xl" style={{color: "#FFD43B"}}></i> {/* Lamp icon */}
            {isHovered && (
            <span className="absolute top-1/2 right-[-230px] transform translate-y-[-50%] text-sm bg-gray-700 text-white p-2 rounded-md opacity-100 transition-opacity duration-300">
                Automatically solve the Puzzle?
            </span>
            )}
        </button>

        <button 
            aria-label="Get a hint"
            onMouseEnter={() => setIsHintHovered(true)}
            onMouseLeave={() => setIsHintHovered(false)}
            onClick={() => { getHint(); }}
            className="relative flex items-center justify-center  rounded-md text-white">
            <i className="fas fa-question-circle text-xl"></i>
            {isHintHovered && (
              <span className="absolute top-1/2 right-[-200px] transform translate-y-[-50%] z-10 text-sm bg-gray-700 text-white p-2 rounded-md opacity-100 transition-opacity duration-300">
                Hint: Each time fill one cell
              </span>
            )}
        </button>

        <div className="relative">
            <label className="cursor-pointer">
              <i className="fa-solid fa-arrow-up-from-bracket text-xl text-gray-600 hover:text-gray-800 transition-colors"></i>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
        </div>


     </h1>

      <div className="grid grid-cols-9 gap-0.5  mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex},${colIndex}`}
              cell={cell}
              onClick={handleCellClick}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              highlighted={highlightedCells.has(`${rowIndex},${colIndex}`)}
              invalid={invalidCells.has(`${rowIndex},${colIndex}`)} // Pass invalid prop
              hintCell={hintCells.has(`${rowIndex},${colIndex}`)} // Pass invalid prop
            />
          ))
        )}
      </div>

      {feedbackMessage && (
         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
         <div className="popup bg-red-100 border border-red-500 text-red-700 p-6 rounded-lg shadow-lg transform transition-all scale-110">
           <p>{feedbackMessage}</p>
         </div>
         </div>
      )}

      {error && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="popup bg-red-100 border border-red-500 text-red-700 p-6 rounded-lg shadow-lg transform transition-all scale-110">
              <p>{error}</p>
            </div>
          </div>
      )}

      <NumberSelector onNumberSelect={handleNumberSelect} />
     
    </div>
  );
};

export default SudokuBoard;
