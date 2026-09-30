import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {

  if (event !== COLUMN_EVENTS.VISIBLE) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.VISIBLE,
    ({ id, item }) => {
      setColumns((currentColumns) =>
        currentColumns.map((column) =>
          column.id === id
            ? {
                ...column,
                visible: item,
              }
            : column
        )
      );
    }
  );
}
function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.VISIBLE,
    {
      id,
      item: value,
    }
  );
}

export const visibleColumn = {
  process,
  emit,
};