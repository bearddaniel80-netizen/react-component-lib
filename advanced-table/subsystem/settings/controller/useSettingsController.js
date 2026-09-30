/*
  USAGE:

  const columnSettingsController =
    useSettingsController(columns);

  const rowsSettingsController =
    useSettingsController(rows);
*/

import { useState, useCallback } from "react";
import { columnPipeline } from "../../events/columnPipeline";

export function useSettingsController(initialSettings = []) {
  const [settings, setSettings] = useState(initialSettings);

  const setFilter = useCallback((id, filter) => {
    setSettings(current =>
      current.map(item =>
        item.id === id
          ? {
            ...item,
            filters: [...(item.filters ?? []), filter],
          }
          : item
      )
    );

    console.log("Fire setFilter", id, filter);
  }, []);

  const setAttribute = useCallback((id, attribute, value) => {
    setSettings(current =>
      current.map(item =>
        item.id === id
          ? {
            ...item,
            [attribute]: value,
          }
          : item
      )
    );
    columnPipeline.emit(
      id,
      attribute,
      value
    );
  }, []);

  const setOrder = useCallback((fromIndex, toIndex) => {
    setSettings(current => {
      const result = [...current];

      const [item] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, item);

      return result;
    });

    console.log("Fire setOrder", fromIndex, toIndex);
  }, []);

  return {
    settings,
    setFilter,
    setAttribute,
    setOrder,
  };
}