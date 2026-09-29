import { usePickerController } from "../usePickerController";
import { sizeModel } from "./sizePickerModel";

export default function SizePicker({
  value,
  sliderModel = sizeModel,
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
    <div className="size-picker">

      <div className="size-control">

        {/* Discrete slider */}
        <input
          type="range"
          min="0"
          max={sliderModel.length - 1}
          step="1"
          value={position}
          onChange={(event) => onMove(Number(event.target.value))}
          className="slider"
        />

      </div>

      {/* Current size */}
      <div className="size-label">
        {currentOption.value}
      </div>

    </div>
  );
}