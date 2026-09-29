// Table.jsx

import { useEffect, useRef } from "react";

import Row from "./Row";
import Column from "./column/Column";
import { useTableController } from "./controller/useTableController";

export default function Table({
  initialColumns,
  rows,
  onRemove,
}) {
  const tableRef = useRef(null);

  const table = useTableController(
    initialColumns,
    rows
  );

  // Keep keyboard focus on the table
  useEffect(() => {
    tableRef.current?.focus();
  }, []);

  return (
    <>
      <table
        ref={tableRef}
        tabIndex={0}
        style={tableStyle}
        onKeyDown={table.handleKeyDown}
      >
        <thead
          style={frozenStyle}
          >
          <tr>
            {table.visibleColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <Row
              key={row.id ?? index}
              row={row}
              index={index}
              initialColumns={table.columns}
              selectedCell={table.selectedCell}
              onSelectCell={table.selectCell}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

const tableStyle = {
  maxHeight: "500px",
  overflowY: "auto"
};
const frozenStyle = {
  position: "sticky"
}