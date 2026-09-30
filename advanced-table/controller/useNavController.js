import { useCallback, useState } from "react";
import { navigationPipeline } from "../subsystem/navigation/navigationPipeline";

export function useNavController({
  rows,
  columns,
  visibleColumns,
}) {
  const [selectedCell, setSelectedCell] = useState({
    rowIndex: 0,
    columnIndex: 0,
  });

  /*
   * ----------------------------------------------------------
   * Cell selection
   * ----------------------------------------------------------
   */

  const selectCell = useCallback(
    (rowIndex, columnIndex) => {
      /*
       * Don't allow selection outside the table.
       */
      if (
        rowIndex < 0 ||
        rowIndex >= rows.length ||
        columnIndex < 0 ||
        columnIndex >= visibleColumns.length
      ) {
        return;
      }

      setSelectedCell({
        rowIndex,
        columnIndex,
      });
    },
    [rows.length, visibleColumns.length]
  );

  /*
   * ----------------------------------------------------------
   * Keyboard navigation
   * ----------------------------------------------------------
   */

  const handleKeyDown = useCallback(
    (event) => {
      const context = {
        event,

        rowIndex: selectedCell.rowIndex,
        columnIndex: selectedCell.columnIndex,

        rows,
        columns,
        visibleColumns,

        selectedCell,
      };

      const result =
        navigationPipeline.navigate(context);

      /*
       * No navigation handler handled the event.
       */
      if (!result?.handled) {
        return;
      }

      /*
       * Navigation handler may have handled the event
       * without actually selecting another cell.
       */
      if (
        result.newRow === undefined ||
        result.newColumn === undefined
      ) {
        event.preventDefault();
        return;
      }

      /*
       * Keep selection inside the table.
       */
      if (
        result.newRow < 0 ||
        result.newRow >= rows.length ||
        result.newColumn < 0 ||
        result.newColumn >= visibleColumns.length
      ) {
        return;
      }

      event.preventDefault();

      selectCell(
        result.newRow,
        result.newColumn
      );
    },
    [
      selectedCell,
      rows,
      columns,
      visibleColumns,
      selectCell,
    ]
  );

  return {
    selectedCell,
    selectCell,
    handleKeyDown,
  };
}