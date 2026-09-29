// controllers/useTableController.js

import { useCallback, useEffect, useState } from "react";
import { eventBus } from "../../eventBus";
import { COLUMN_EVENTS } from "../events/definitions";

export function useTableController(initialColumns, rows) {
  const [columns, setColumns] = useState(initialColumns);

  const [selectedCell, setSelectedCell] = useState({
    rowIndex: 0,
    columnIndex: 0,
  });

  /*
   * Column events
   */
  useEffect(() => {
    return eventBus.on(COLUMN_EVENTS.HIDE, ({ columnId }) => {
      setColumns((currentColumns) =>
        currentColumns.map((column) =>
          column.id === columnId.id && columnId.hideable
            ? { ...column, hidden: true }
            : column
        )
      );
    });
  }, []);

  /*
   * Derived state
   */
  const visibleColumns = columns.filter(
    (column) => column.visible !== false
  );

  /*
   * Cell selection
   */
  const selectCell = useCallback((rowIndex, columnIndex) => {
    setSelectedCell({
      rowIndex,
      columnIndex,
    });
  }, []);

  /*
   * Keyboard navigation
   */
  const handleKeyDown = useCallback(
    (e) => {
      const { rowIndex, columnIndex } = selectedCell;

      let newRow = rowIndex;
      let newColumn = columnIndex;

      switch (e.key) {
        case "ArrowUp":
          newRow--;
          break;

        case "ArrowDown":
          newRow++;
          break;

        case "ArrowLeft":
          newColumn--;
          break;

        case "ArrowRight":
          newColumn++;
          break;

        default:
          return;
      }

      // Don't allow cursor to leave table
      if (
        newRow < 0 ||
        newRow >= rows.length ||
        newColumn < 0 ||
        newColumn >= visibleColumns.length
      ) {
        return;
      }

      e.preventDefault();

      selectCell(newRow, newColumn);
    },
    [selectedCell, rows.length, visibleColumns.length, selectCell]
  );

  return {
    columns,
    visibleColumns,

    selectedCell,
    selectCell,

    handleKeyDown,
  };
}