import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {

  if (event !== COLUMN_EVENTS.RESIZE) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.RESIZE,
    ({ id, item }) => {
      setColumns((currentColumns) =>
        currentColumns.map((column) =>
          column.id === id
            ? {
                ...column,
                width: item,
              }
            : column
        )
      );
    }
  );
}
function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.RESIZE,
    {
      id,
      item: value,
    }
  );
}

export const sizeColumn = {
  process,
  emit,
};