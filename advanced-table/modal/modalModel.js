import renderTabPanel from "../tabs/model/renderTabPanel";

export function useModals(menuBar, columnTabs, rowTabs) {
  return [
    {
      title: "Column Settings",
      text: "Column",
      click: menuBar.openColumnSettings,
      openModal: menuBar.isColumnSettingsOpen,
      render: () => renderTabPanel(columnTabs, "colorize")
    },
    /*
    {
      title: "Row Settings",
      text: "Row",
      click: menuBar.openRowSettings,
      openModal: menuBar.isRowSettingsOpen,
      render: () => renderTabPanel(rowTabs, "colorize")
    }
      */
  ]
}