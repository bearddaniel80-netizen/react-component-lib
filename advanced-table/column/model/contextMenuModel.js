export function contextMenuModel(onFreeze, onHide) {
  return [
    {
      label: "Freeze column",
      onSelect: onFreeze,
    },
    {
      label: "Hide column",
      onSelect: onHide,
    },
  ];
}