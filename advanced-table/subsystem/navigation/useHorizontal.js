export function horizontalNavigation(context) {
  const { event, columnIndex } = context;

  switch (event.key) {
    case "ArrowLeft":
      return {
        ...context,
        newColumn: columnIndex - 1,
        handled: true,
      };

    case "ArrowRight":
      return {
        ...context,
        newColumn: columnIndex + 1,
        handled: true,
      };

    default:
      return context;
  }
}