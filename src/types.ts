export type Board = Cell[][];

export type Cell = {
    row: number;
    col: number;
    value: number | null;
    editable?: boolean;
};

export const createBoard = (): Board => {
    return Array.from({ length: 9 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => ({
            row: row,
            col: col,
            value: null,
            editable: true,
        }))
    );
};