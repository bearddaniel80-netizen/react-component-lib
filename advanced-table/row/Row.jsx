import { useEffect, useState } from "react";
import { columnPipeline } from "../subsystem/events/columnPipeline";
import { colorizeColumn } from "../subsystem/events/colorize";
import { freezeColumn } from "../subsystem/events/freeze";
import { hideColumn } from "../subsystem/events/hide";
import { nameColumn } from "../subsystem/events/name";
import { orderColumn } from "../subsystem/events/order";
import { sizeColumn } from "../subsystem/events/size";
import { sortColumn } from "../subsystem/events/sort";
import { visibleColumn } from "../subsystem/events/visible";
import { COLUMN_EVENTS } from "../subsystem/events/definitions";
import Cell from "../cell/Generic";

export default function Row({
  row,
  index,
  initialColumns,
  selectedCell,
  onSelectCell,
  onRemove
}) {
  const [columns, setColumns] = useState(initialColumns);
  /*
   * ----------------------------------------------------------
   * Column events
   * ----------------------------------------------------------
   */

  useEffect(() => {
    columnPipeline.process(setColumns);
  }, []);


  const visibleColumns = columns.filter(
    (column) => column.visible !== false
  );

  return (
    <tr>
      {visibleColumns
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