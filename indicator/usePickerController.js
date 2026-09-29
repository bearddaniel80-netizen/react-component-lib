import { useEffect, useState } from "react";
import { findPosition } from "./usePicker";

export function usePickerController({
  value,
  model,
  onChange,
}) {
  const initialPosition = findPosition(value, model);

  const [position, setPosition] = useState(initialPosition);
  const [currentOption, setOption] = useState(model[initialPosition]);

  const onSelect = (index) => {
    const option = model[index];

    if (!option) return;

    setPosition(index);
    setOption(option);

    onChange?.(option.value);
  };
  const onMove = (index) => {
    const option = model[index];

    //if (!option) return;

    setPosition(index);
    setOption(option);

    //onChange?.(option.value);
  };


  // Keep controller synchronized if the value changes
  // from outside the picker.
  useEffect(() => {
    const newPosition = findPosition(value, model);
    const newOption = model[newPosition];

    setPosition(newPosition);
    setOption(newOption);
  }, [value, model]);

  return {
    position,
    currentOption,
    onSelect,
    onMove,
  };
}