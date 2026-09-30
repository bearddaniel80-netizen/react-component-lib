import { eventBus } from "../../../eventBus";
import { COLUMN_EVENTS } from "./definitions";

function process(event, setColumns) {
    if (event !== COLUMN_EVENTS.HIDE) {
        return null;
    }

    return eventBus.on(
        COLUMN_EVENTS.HIDE,
        ({ columnObject, item }) => {
            setColumns((currentColumns) =>
                currentColumns.map((column) =>
                    column.id === columnObject.id &&
                        columnObject.hideable
                        ? {
                            ...column,
                            hidden: item,
                        }
                        : column
                )
            );
        }
    );
}
function emit(columnObject, value) {
  return eventBus.emit(
    COLUMN_EVENTS.HIDE,
    {
      columnObject,
      item: value,
    }
  );
}

export const hideColumn = {
  process,
  emit,
};