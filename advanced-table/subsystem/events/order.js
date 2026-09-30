import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {

  if (event !== COLUMN_EVENTS.REORDER) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.REORDER,
    ({ id, item }) => {
      setColumns((currentColumns) =>
        currentColumns.map((column) =>
          column.id === id
            ? {
                ...column,
                order: item,
              }
            : column
        )
      );
    }
  );
}
function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.REORDER,
    {
      id,
      item: value,
    }
  );
}

export const orderColumn = {
  process,
  emit,
};