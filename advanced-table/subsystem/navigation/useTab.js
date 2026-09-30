export function tabNavigation(context) {
  const {
    event,
    rowIndex,
    columnIndex,
    visibleColumns,
  } = context;

  if (event.key !== "Tab") {
    return context;
  }

  const lastColumn = visibleColumns.length - 1;

  if (event.shiftKey) {
    const newColumn = columnIndex - 1;

    if (newColumn < 0) {
      return {
        ...context,
        newRow: rowIndex - 1,
        newColumn: lastColumn,
        handled: true,
      };
    }

    return {
      ...context,
      newRow: rowIndex,
      newColumn,
      handled: true,
    };
  }

  const newColumn = columnIndex + 1;

  if (newColumn > lastColumn) {
    return {
      ...context,
      newRow: rowIndex + 1,
      newColumn: 0,
      handled: true,
    };
  }

  return {
    ...context,
    newRow: rowIndex,
    newColumn,
    handled: true,
  };
}