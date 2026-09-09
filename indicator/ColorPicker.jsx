import { useEffect, useState } from "react";
import "./ColorPicker.css";
import {colorModel} from "./colorPickerModel";

const colors = colorModel;

function findPosition(color) {
  if (!color) {
    return 0;
  }

  const index = colors.findIndex(
    (item) => item.rgb.toLowerCase() === color.toLowerCase()
  );

  // Unknown color -> White
  return index === -1 ? 0 : index;
}

export default function ColorPicker({
  color,
  onChange,
}) {
  const [position, setPosition] = useState(
    findPosition(color)
  );

  const currentColor = colors[position];

  // If the parent changes the color,
  // move the slider to the corresponding position.
  useEffect(() => {
    setPosition(findPosition(color));
  }, [color]);

  const handleSliderChange = (event) => {
    const newPosition = Number(event.target.value);
    const newColor = colors[newPosition].rgb;

    setPosition(newPosition);

    // Send the RGB value back to the parent
    onChange?.(newColor);
  };

  return (
    <div className="color-picker">

      {/* Color picker + slider */}
      <div className="color-control">

        {/* Four color boxes */}
        <div className="color-options">
          {colors.map((item, index) => (
            <div
              key={item.name}
              className={`color-option ${
                position === index ? "selected" : ""
              }`}
              style={{
                backgroundColor: item.rgb,
              }}
              onClick={() => {
                setPosition(index);
                onChange?.(item.rgb);
              }}
              title={item.name}
            />
          ))}
        </div>

        {/* Discrete slider */}
        <input
          type="range"
          min="0"
          max={colors.length - 1}
          step="1"
          value={position}
          onChange={handleSliderChange}
          className="slider"
        />

      </div>

      {/* Current color */}
      <div
        className="color-label"
        style={{
          backgroundColor: currentColor.rgb,
        }}
        title={currentColor.name}
      >
        {currentColor.name}
      </div>

    </div>
  );
}

