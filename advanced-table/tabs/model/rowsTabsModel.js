import renderTabPage from "./renderTabPage";
import Colorize from "../../subsystem/settings/Colorize";
import Visibility from "../../subsystem/settings/Visibility";

export function useRowTabs(rows) {
    const pageComponents = {
        colorize: Colorize,
        visibility: Visibility,
    };

    const tabs = [
        { id: "colorize", label: "Colorize" },
        { id: "visibility", label: "Visibility" },
    ];

    return tabs.map(({ id, label }) => ({
        id,
        label,
        render: () =>
            renderTabPage(
                rows,
                pageComponents[id],
                null
            ),
    }));
}