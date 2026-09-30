export function enterNavigation(context) {
  if (context.event.key !== "Enter") {
    return context;
  }

  context.onEnter?.(context);

  return {
    ...context,
    handled: true,
    action: "enter",
  };
}