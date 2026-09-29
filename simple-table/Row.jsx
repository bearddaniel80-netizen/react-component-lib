import { useEffect, useState } from "react";
import Cell from "./cell/Generic";

export default function Row({ 
  row, 
  index, 
  initialColumns, 
  selectedCell,
  onSelectCell,
  onRemove 
}) {

  return (
    <tr>
      {initialColumns
      .map((column, columnIndex) => (
        <Cell
          key={column.id}
          column={column}
          row={row}
          index={index}
          columnIndex={columnIndex}
          selected={
            selectedCell.rowIndex === index &&
            selectedCell.columnIndex === columnIndex
          }
          onSelect={onSelectCell}
          onRemove={onRemove}
        />
      ))}
    </tr>
  );
}