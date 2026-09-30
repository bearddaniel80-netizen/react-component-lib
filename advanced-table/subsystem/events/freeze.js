import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {
  if (event !== COLUMN_EVENTS.FREEZE) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.FREEZE,
    ({ id, item }) => {
      setColumns(currentColumns =>
        currentColumns.map(column =>
          column.id === id
            ? {
                ...column,
                frozen: item,
              }
            : column
        )
      );
    }
  );
}

function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.FREEZE,
    {
      id,
      item: value,
    }
  );
}

export const freezeColumn = {
  process,
  emit,
};