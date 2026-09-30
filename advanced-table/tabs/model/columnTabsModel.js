import renderTabPage from "./renderTabPage";
import Colorize from "../../subsystem/settings/Colorize";
import Filter from "../../subsystem/settings/Filter";
import Reorder from "../../subsystem/settings/Reorder";
import Resize from "../../subsystem/settings/Size";
import Sort from "../../subsystem/settings/Sort";
import Visibility from "../../subsystem/settings/Visibility";
import { useSettingsController } from "../../subsystem/settings/controller/useSettingsController"

export function useColumnTabs(columns) {
    const controller = useSettingsController(columns);

    const pageComponents = {
        colorize: Colorize,
        filter: Filter,
        reorder: Reorder,
        resize: Resize,
        sort: Sort,
        visibility: Visibility,
    };

    const tabs = [
        { id: "colorize", label: "Colorize", ontoggle: controller.setAttribute },
        { id: "filter", label: "Filter", ontoggle: controller.setFilter },
        { id: "reorder", label: "Reorder", ontoggle: controller.setOrder },
        { id: "resize", label: "Resize", ontoggle: controller.setAttribute },
        { id: "sort", label: "Sort", ontoggle: controller.setAttribute },
        { id: "visibility", label: "Visibility", ontoggle: controller.setAttribute},
    ];

    return tabs.map(({ id, label, ontoggle }) => ({
        id,
        label,
        render: () =>
            renderTabPage(
                id,
                columns,
                pageComponents[id],
                ontoggle
            ),
    }));
}