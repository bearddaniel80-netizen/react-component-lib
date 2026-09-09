import { useFormatSize } from "./useFormatSize";

export default function SizeCell({ row }) {
  return (
    <span style={{ whiteSpace: "nowrap" }}>
      {useFormatSize(row.size)}
    </span>
  );
}