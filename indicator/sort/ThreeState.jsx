import { usePickerController } from "../usePickerController";
import { sortModel } from "./sortPickerModel";
import "./ThreeState.css";

export default function ThreeState({
  value,
  sliderModel = sortModel,
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
    <div className="three-picker">

      <div className="three-control">

        {/* Discrete slider */}
        <input
          type="range"
          min="0"
          max={sliderModel.length - 1}
          step="1"
          value={position}
          onChange={(event) => onMove(Number(event.target.value))}
          className="slider"
          style={{
            "--slider-color": currentOption.color,
          }}
        />

      </div>

      {/* Current value */}
      <div className="three-label">
        {currentOption.name}
      </div>

    </div>
  );
}
