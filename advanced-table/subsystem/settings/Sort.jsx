import ThreeState from "../../../indicator/sort/ThreeState";
import "./Settings.css";
import { sortModel } from "../../../indicator/sort/sortPickerModel";
import { ArrowUpDown } from "lucide-react";

export default function Sort({ item, onToggle }) {
  function handleChange(value) {
    onToggle(item.id, "sort", value)  
  }
  if (!item.sortable) {
    return (
      <div className="item-setting">
        <ArrowUpDown style={{color: "red"}}/><span>{item.label}</span>

        <span
          className="item-setting-fixed"
          title="This item cannot be sorted"
        >
          Not sortable
        </span>
      </div>
    );
  }

  return (
    <div className="item-setting">
      <ArrowUpDown style={{color: "green"}}/><span>{item.label}</span>

      <ThreeState
        value={item.sort}
        model={sortModel}
        onChange={handleChange}
      />
    </div>
  );
}