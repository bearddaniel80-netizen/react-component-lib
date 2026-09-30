import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {

  if (event !== COLUMN_EVENTS.SORT) {
    return null;
  }

  return eventBus.on(
    COLUMN_EVENTS.SORT,
    ({ id, item }) => {
      setColumns((currentColumns) =>
        currentColumns.map((column) =>
          column.id === id
            ? {
                ...column,
                sort: item,
              }
            : column
        )
      );
    }
  );
}
function emit(id, value) {
  return eventBus.emit(
    COLUMN_EVENTS.SORT,
    {
      id,
      item: value,
    }
  );
}

export const sortColumn = {
  process,
  emit,
};