import { usePickerController } from "../usePickerController";
import { colorModel } from "./colorPickerModel";
import ColorSwatch from "./ColorSwatch";
import "./ColorPicker.css"

export default function ColorPicker({
  color,
  sliderModel = colorModel,
  onChange,
}) {
  const {
    position,
    currentOption,
    onSelect
  } = usePickerController({
    value: color,
    model: sliderModel,
    onChange,
  });

  return (
    <div className="color-picker">

      {/* Color swatches */}
      <div className="color-options">
        {sliderModel.map((item, index) => (
          <ColorSwatch
            key={item.name}
            className={"item"+index}
            color={item.rgb}
            title={item.name}
            selected={position === index}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      {/* Current color */}
      <div>
        <span className="item5">{currentOption.name}</span>
      </div>

    </div>
  );
}