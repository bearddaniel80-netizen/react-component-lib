export function verticalNavigation(context) {
  const { event, rowIndex } = context;

  switch (event.key) {
    case "ArrowUp":
      return {
        ...context,
        newRow: rowIndex - 1,
        handled: true,
      };

    case "ArrowDown":
      return {
        ...context,
        newRow: rowIndex + 1,
        handled: true,
      };

    default:
      return context;
  }
}