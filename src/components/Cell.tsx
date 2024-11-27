import { Cell as CellType } from '../types';


const Cell = ({ cell, onClick, isSelected, highlighted, invalid, hintCell }: { cell: CellType; onClick: (cell: CellType) => void; isSelected: boolean; highlighted: boolean; invalid:boolean ,hintCell:boolean}) => {
    return (
        <div
        
            className={`border border-gray-400 text-center w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center font-mediumr rounded-lg 
            ${isSelected ? 'animate-pulse' : ''} 
            cursor-pointer hover:bg-gray-400 transition-colors 
            ${cell.editable ? 'bg-gray-200' : ''} 
            ${highlighted ? 'bg-sky-200' : ''} 
            ${invalid ? 'bg-red-300 border border-red-500' : ''} 
            ${hintCell ? 'bg-green-300 border border-green-500' : ''} 
            ${cell.col === 2 || cell.col === 5 ? 'mr-2' : ''} 
            ${cell.row === 2 || cell.row === 5 ? 'mb-4' : ''}`}
            onClick={() => cell.editable && onClick(cell)}
        >
            {cell.value}
        </div>
    );
};

export default Cell;
