export function findPosition(value, options) {
  // Default to false
  if (value === undefined || value === null) {
    return 0;
  }

  const index = options.findIndex(
    (item) => item.value === value
  );

  // Unknown value -> false
  return index === -1 ? 0 : index;
}