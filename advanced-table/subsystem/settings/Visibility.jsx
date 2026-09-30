import BooleanPicker from "../../../indicator/boolean/BooleanPicker";
import "./Settings.css";
import {booleanModel} from "./models/booleanPickerModel"

import { Eye, EyeOff } from "lucide-react";

export default function Visibility({ item, onToggle }) {
  function handleChange(value) {
    console.log(item.visible, value)
    onToggle(item.id, "visible", value)
    console.log("item.visible === value: ", item.visible === value)
  }

  if (!item.hideable) {
    return (
      <div className="item-setting">
        <EyeOff style={{ color: "red" }} />
        <span>{item.label}</span>

        <span
          title="This item cannot be hidden"
        >
          Always shown
        </span>
      </div>
    );
  }

  return (
    <div className="item-setting">
      <Eye style={{ color: "green" }} />
      <span>{item.label}</span>

      <BooleanPicker
        value={item.visible}
        model={booleanModel}
        onChange={handleChange}
      />
    </div>
  );
}