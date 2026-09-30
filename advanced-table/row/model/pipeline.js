import Colorize from "../../subsystem/settings/Colorize";
import Filter from "../../subsystem/settings/Filter";
import Resize from "../../subsystem/settings/Size";
import Visibility from "../../subsystem/settings/Visibility";

export const rowPipeline = {
  type: "row",

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
      id: "resize",
      label: "Resize",
      component: Resize,
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