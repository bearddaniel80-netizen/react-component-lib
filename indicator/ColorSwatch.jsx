export default function ColorSwatch({ color, title }) {
  return (
      <span
        title={title}
        style={{
        display: "inline-block",
        width: "16px",
        height: "16px",
        borderRadius: "3px",
          backgroundColor: color,
        }}
      />
  );
}