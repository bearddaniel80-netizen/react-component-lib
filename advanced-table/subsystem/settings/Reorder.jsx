import { GripVertical } from "lucide-react"
import "./Settings.css";

export default function Colorize({ item, onToggle }) {
  return (
    <div className="item-setting">
      <GripVertical onChange={() => onToggle(item.key, item.order, 0)}/>
      <span>{item.label}</span>
      <span>
      {item.order}
      </span>
    </div>
  );
}