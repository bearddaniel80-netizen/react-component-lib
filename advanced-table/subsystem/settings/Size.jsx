import SizePicker from "../../../indicator/size/SizePicker";
import { sizeModel } from "../../../indicator/size/sizePickerModel";
import "./Settings.css";
import { MoveHorizontal } from "lucide-react";

export default function Resize({ item, onToggle }) {
  function handleChange(value) {
    onToggle(item.id, "width", value)
  }

  return (
    <div className="item-setting">
        <MoveHorizontal size={18}/>
      <span>{item.label}</span>

      <SizePicker
        value={item.visible}
        model={sizeModel}
        onChange={handleChange}
      />
    </div>
  );
}