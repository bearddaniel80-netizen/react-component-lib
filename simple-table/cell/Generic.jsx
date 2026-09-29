import { cellComponents } from "./useCellComponent";

export default function Cell({
  column,
  rowIndex,
  columnIndex,
  selected,
  onSelect,
  ...props
}) {
  if (column.visible === false) return null;

  const Component = cellComponents[column.id];

  return (
    <td
      onClick={() => onSelect(rowIndex, columnIndex)}
      style={{
        ...tdStyle,
        ...(column.id === "actions"
          ? { textAlign: "center" }
          : {}),
        ...(selected ? cellSelectedStyle : {}),
      }}
    >
      {Component ? (
        <Component column={column} {...props} />
      ) : (
        "—"
      )}
    </td>
  );
}

const tdStyle = {
  padding: "9px 10px",
  verticalAlign: "middle",
  cursor: "default",
};

const cellSelectedStyle = {
  outline: "2px solid #2684ff",
  outlineOffset: "-2px",
  background: "#eaf3ff",
};