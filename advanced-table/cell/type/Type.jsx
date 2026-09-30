import ColorSwatch from "../../../indicator/ColorSwatch";
import { mimeColors } from "./mimeColorModel";


export default function TypeCell({ row }) {
  function getMimeColor(mimeType) {
    if (!mimeType) return "white";

    const category = mimeType.split("/")[0];

    return mimeColors[category] ?? "white";
  }
  const mimeColor = getMimeColor(row.mimeType);
  return (

    <ColorSwatch
      title={row.mimeType || "Unknown"}
      color={mimeColor}
    />
  );
}