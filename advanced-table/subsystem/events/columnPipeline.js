import { colorizeColumn } from "./colorize";
import { freezeColumn } from "./freeze";
import { hideColumn } from "./hide";
import { nameColumn } from "./name";
import { orderColumn } from "./order";
import { sizeColumn } from "./size";
import { sortColumn } from "./sort";
import { visibleColumn } from "./visible";
import { COLUMN_EVENTS } from "./definitions";

export class ColumnPipeline {
  constructor() {
    this.handlers = [];
  }

  register({
    attribute = null,
    event = null,
    process = null,
    emit = null,
  }) {
    const entry = {
      attribute,
      event,
      process,
      emit,
    };

    this.handlers.push(entry);

    return () => {
      this.handlers = this.handlers.filter(
        item => item !== entry
      );
    };
  }

  process(callback) {
    const result = [];

    for (const {
      process,
      event,
    } of this.handlers) {
      if (!process) {
        continue;
      }

      result.push(
        process(event, callback)
      );
    }

    return result;
  }

  emit(id, attribute, value) {
    for (const {
      attribute: registeredAttribute,
      emit,
    } of this.handlers) {
      if (registeredAttribute !== attribute || !emit) {
        continue;
      }
      emit(id, value);
    }
  }
}
export const columnPipeline = new ColumnPipeline();

columnPipeline.register({
  attribute: "background",
  event: COLUMN_EVENTS.COLORIZE,
  process: colorizeColumn.process,
  emit: colorizeColumn.emit,
});
columnPipeline.register({ attribute: "frozen", event: COLUMN_EVENTS.FREEZE, process: freezeColumn.process, emit: freezeColumn.emit});
columnPipeline.register({ attribute: "hidden", event: COLUMN_EVENTS.HIDE, process: hideColumn.process, emit: hideColumn.emit});
columnPipeline.register({ attribute: "label", event: COLUMN_EVENTS.RENAME, process: nameColumn.process, emit: nameColumn.emit});
columnPipeline.register({ attribute: "order", event: COLUMN_EVENTS.REORDER, process: orderColumn.process, emit: orderColumn.emit});
columnPipeline.register({ attribute: "width", event: COLUMN_EVENTS.RESIZE, process: sizeColumn.process, emit: sizeColumn.emit});
columnPipeline.register({ attribute: "sort", event: COLUMN_EVENTS.SORT, process: sortColumn.process, emit: sortColumn.emit});
columnPipeline.register({ attribute: "visible", event: COLUMN_EVENTS.VISIBLE, process: visibleColumn.process, emit: visibleColumn.emit});