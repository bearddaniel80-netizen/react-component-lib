const PAGE_SIZE = 10;

export function pageNavigation(context) {
  const {
    event,
    rowIndex,
    columnIndex,
  } = context;

  switch (event.key) {
    case "PageUp":
      return {
        ...context,
        newRow: rowIndex - PAGE_SIZE,
        newColumn: columnIndex,
        handled: true,
      };

    case "PageDown":
      return {
        ...context,
        newRow: rowIndex + PAGE_SIZE,
        newColumn: columnIndex,
        handled: true,
      };

    default:
      return context;
  }
}