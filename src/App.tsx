import { useState } from 'react';
import SudokuBoard from './components/SudokuBoard';
import { generateSudokuBoard, checkSudokuSolution } from './utils/sudoku';
import { Board } from './types';
import './App.css';

// Modal Component
const Modal = ({ onClose, onSelectDifficulty }: any) => {
    return (
        <div className="modal fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-content bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-xl mb-4 text-center">Select Difficulty</h2>
                <div className="flex justify-around mb-4">
                    <button
                        onClick={() => onSelectDifficulty('easy')}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => onSelectDifficulty('medium')}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => onSelectDifficulty('hard')}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    >
                        Hard
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const App = () => {

  const difficulties = [0.2, 0.35, 0.5];

  const [difficulty, setDifficulty] = useState<number>(
    () => difficulties[Math.floor(Math.random() * difficulties.length)]
  );

  const getLevel = () =>{
    switch (difficulty) {
      case 0.2:
        return "Easy";
      case 0.35:
        return "Medium";
      case 0.5:
        return "Hard";
    }
  }

  const [board, setBoard] = useState<Board>(() => generateSudokuBoard(difficulty));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isNewBoard,setIsNewBoard] = useState<boolean>(false);
  const [difficultiesDisplay,setDifficultiesDisplay] = useState<string| any>(getLevel());

  const handleDifficultyChange = (level: string) => {
        let newDifficulty = 0.35; // Default to medium
        setDifficultiesDisplay("Medium");
        if (level === 'easy') {
            newDifficulty = 0.2; // Easy difficulty (30% cells removed)
            setDifficultiesDisplay("Easy");

        } else if (level === 'hard') {
            newDifficulty = 0.5; // Hard difficulty (70% cells removed)
            setDifficultiesDisplay("Hard");

        }
        setDifficulty(newDifficulty);
        setBoard(generateSudokuBoard(newDifficulty)); // Regenerate board with selected difficulty
        setIsNewBoard(true);
        setIsModalOpen(false); // Close the modal after selecting difficulty
   };

  const newGame = () => {
    setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)]);
    setDifficultiesDisplay("Medium");
    if (difficulty === 0.5) {
      setDifficultiesDisplay("Hard");
    }else if (difficulty ===0.2) {
      setDifficultiesDisplay("Easy");
    }    
    const newBoard = generateSudokuBoard(difficulty); // Generate a fresh board
    setBoard(newBoard); // Update state with the new board
    setIsNewBoard(true);
  };

  const checkSolution = () => {
    if (checkSudokuSolution(board)) {
      setValidationMessage("Congratulations! You solved the puzzle!");
      setTimeout(() => setValidationMessage(null), 3000); // Clear the error after 3 seconds
    } else {
      setValidationMessage("Not Valid Solution"); // Inform user that the board is incomplete
      setTimeout(() => setValidationMessage(null), 3000); // Clear the error after 3 seconds
    }
  };

  return (
    <div className="app flex flex-col items-center bg-gray-100 min-h-screen ">


    {validationMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div
                className={`popup p-6 rounded-lg shadow-lg transform transition-all scale-110 ${
                    validationMessage.toLowerCase().includes("congratulation")
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-red-100 border-red-500 text-red-700"
                }`}
            >
                <p>{validationMessage}</p>
            </div>
        </div>
    )}

    
      <SudokuBoard board={board} setBoard={setBoard} isNewBoard={isNewBoard}/>


    {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onSelectDifficulty={handleDifficultyChange} />}

    
      {/* Button Group */}
      <div className="flex flex-row items-center space-x-2">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          onClick={newGame}
        >
          New Game
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
          onClick={checkSolution}
        >
          Check Solution
        </button>

        <div className="text-center">       
            <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition"
            >    
                     Difficulty: <span className='text-[10px]'> {difficultiesDisplay} </span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default App;
