import { usePickerController } from "../usePickerController";
import { booleanModel } from "./booleanPickerModel";
import "./BooleanPicker.css";

export default function BooleanPicker({
  value,
  sliderModel = booleanModel,
  onChange,
}) {
  
  const {
    position,
    currentOption,
    onMove
  } = usePickerController({
    value,
    model: sliderModel,
    onChange,
  });

  return (
    <div className="boolean-picker">

      <div className="boolean-control">
        <input
          type="range"
          min={0}
          max={sliderModel.length - 1}
          step={1}
          value={position}
          onChange={(e) => {
            const index = Number(e.target.value);
            onMove(index);
          }}
          className="slider"
          style={{
            "--slider-color": currentOption.color,
          }}
        />
      </div>

      {/* Current value */}
      <div className="boolean-label">
        {currentOption.name}
      </div>

    </div>
  );
}
