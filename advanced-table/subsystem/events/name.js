import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {

  if (event !== COLUMN_EVENTS.RENAME) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.RENAME,
    ({ id, item }) => {
      setColumns((currentColumns) =>
        currentColumns.map((column) =>
          column.id === id
            ? {
                ...column,
                label: item,
              }
            : column
        )
      );
    }
  );
}
function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.RENAME,
    {
      id,
      item: value,
    }
  );
}

export const nameColumn = {
  process,
  emit,
};