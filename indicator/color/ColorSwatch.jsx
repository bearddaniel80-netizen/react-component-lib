import "./ColorSwatch.css";

export default function ColorSwatch({
  color,
  title,
  selected = false,
  onClick,
}) {
  return (
    <span
      title={title}
      onClick={onClick}
      className={`color-swatch ${selected ? "selected" : ""}`}
      style={{
        display: "inline-block",
        width: "24px",
        height: "24px",
        borderRadius: "3px",
        backgroundColor: color,
        cursor: "pointer",
      }}
    />
  );
}