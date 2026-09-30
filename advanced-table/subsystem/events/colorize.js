import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {
  if (event !== COLUMN_EVENTS.COLORIZE) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.COLORIZE,
    ({ id, color }) => {
      setColumns(currentColumns =>
        currentColumns.map(column =>
          column.id === id
            ? {
                ...column,
                background: color,
              }
            : column
        )
      );
    }
  );
}

function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.COLORIZE,
    {
      id,
      color: value,
    }
  );
}

export const colorizeColumn = {
  process,
  emit,
};