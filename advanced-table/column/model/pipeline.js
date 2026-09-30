import Colorize from "../../subsystem/settings/Colorize";
import Filter from "../../subsystem/settings/Filter";
import Reorder from "../../subsystem/settings/Reorder";
import Resize from "../../subsystem/settings/Size";
import Sort from "../../subsystem/settings/Sort";
import Visibility from "../../subsystem/settings/Visibility";

export const columnPipeline = {
  type: "column",

  pages: [
    {
      id: "colorize",
      label: "Colorize",
      component: Colorize,
      action: "setAttribute",
    },
    {
      id: "filter",
      label: "Filter",
      component: Filter,
      action: "setFilter",
    },
    {
      id: "reorder",
      label: "Reorder",
      component: Reorder,
      action: "setOrder",
    },
    {
      id: "resize",
      label: "Resize",
      component: Resize,
      action: "setAttribute",
    },
    {
      id: "sort",
      label: "Sort",
      component: Sort,
      action: "setAttribute",
    },
    {
      id: "visibility",
      label: "Visibility",
      component: Visibility,
      action: "setAttribute",
    },
  ],
};