import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { columnPipeline } from "../subsystem/events/columnPipeline";
import { useNavController } from "./useNavController";

export function useTableController(
  initialColumns,
  rows
) {
  const [columns, setColumns] = useState(initialColumns);

  /*
   * ----------------------------------------------------------
   * Column events
   * ----------------------------------------------------------
   */

  useEffect(() => {
   columnPipeline.process(setColumns);
  }, []);

  /*
   * ----------------------------------------------------------
   * Derived columns
   * ----------------------------------------------------------
   */

  const visibleColumns = useMemo(
    () =>
      columns.filter(
        (column) =>
          column.visible !== false &&
          column.hidden !== true
      ),
    [columns]
  );

  /*
   * ----------------------------------------------------------
   * Nav controller
   * ----------------------------------------------------------
   */

  const cellController = useNavController({
    rows,
    columns,
    visibleColumns,
  });

  /*
   * ----------------------------------------------------------
   * Controller API
   * ----------------------------------------------------------
   */

  return {
    columns,
    visibleColumns,

    ...cellController,
  };
}
