// controllers/useMenuBarController.js

import { useState, useCallback } from "react";

export function useMenuBarController(initialColumns) {
  const [columns, setColumns] = useState(initialColumns);

  const [modal, setModal] = useState(null);

  const openColumnSettings = useCallback(() => {
    setModal("columns");
  }, []);

  const openRowSettings = useCallback(() => {
    setModal("rows");
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const hideColumn = useCallback((columnId) => {
    setColumns(current =>
      current.map(column =>
        column.id === columnId
          ? { ...column, hidden: true }
          : column
      )
    );
  }, []);

  const showColumn = useCallback((columnId) => {
    setColumns(current =>
      current.map(column =>
        column.id === columnId
          ? { ...column, hidden: false }
          : column
      )
    );
  }, []);

  const reorderColumns = useCallback((fromIndex, toIndex) => {
    setColumns(current => {
      const result = [...current];

      const [column] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, column);

      return result;
    });
  }, []);

  return {
    // Model/state
    columns,

    // Modal state
    modal,
    isColumnSettingsOpen: modal === "columns",
    isRowSettingsOpen: modal === "rows",

    // Commands
    openColumnSettings,
    openRowSettings,
    closeModal,

    hideColumn,
    showColumn,
    reorderColumns
  };
}