import { Pipette } from "lucide-react";
import ColorPicker from "../../../indicator/color/ColorPicker";
import "./Settings.css";

export default function Colorize({ item, onToggle }) {
  function handleChange(color) {
    return onToggle(item.id, "background", color);
  }

  return (
    <div className="item-setting">
      <Pipette size={18} />

      <span>{item.label}</span>

      <span>
        <ColorPicker
          color={item.background}
          onChange={handleChange}
        />
      </span>
    </div>
  );
}