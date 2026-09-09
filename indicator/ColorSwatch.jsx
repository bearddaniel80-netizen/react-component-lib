export default function ColorSwatch({ color }) {
  return (
      <span
        style={{
          width: "60px",
          height: "10px",
          border: "1px solid #000",
          backgroundColor: color,
        }}
      />
  );
}