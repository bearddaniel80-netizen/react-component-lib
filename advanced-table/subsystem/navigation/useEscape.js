export function escapeNavigation(context) {
  if (context.event.key !== "Escape") {
    return context;
  }

  context.onEscape?.();

  return {
    ...context,
    handled: true,
    action: "escape",
  };
}