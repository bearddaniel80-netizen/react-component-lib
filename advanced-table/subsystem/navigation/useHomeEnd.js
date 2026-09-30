export function homeEndNavigation(context) {
  const {
    event,
    rowIndex,
    visibleColumns,
  } = context;

  switch (event.key) {
    case "Home":
      return {
        ...context,
        newRow: rowIndex,
        newColumn: 0,
        handled: true,
      };

    case "End":
      return {
        ...context,
        newRow: rowIndex,
        newColumn: visibleColumns.length - 1,
        handled: true,
      };

    default:
      return context;
  }
}