// NumberSelector.tsx
import React from 'react';

interface NumberSelectorProps {
  onNumberSelect: (number: number) => void; // Callback to send the selected number to the parent (SudokuBoard)
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ onNumberSelect }) => {
  const handleClick = (number: number) => {
    onNumberSelect(number); // Pass the selected number to the parent component
  };

  return (
    <div className="number-selector">
      <div className="flex space-x-2">
        {Array.from({ length: 9 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)} // Passing the number clicked
            className="w-10 h-10 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberSelector;