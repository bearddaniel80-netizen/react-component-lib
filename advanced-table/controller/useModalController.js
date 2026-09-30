// controllers/useMenuBarController.js

import { useState, useCallback } from "react";

export function useModalController() {
  const [modal, setModal] = useState(null);

  const openColumnSettings = useCallback(() => {
    setModal("columns");
  }, []);

  const openRowSettings = useCallback(() => {
    setModal("rows");
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return {

    // Modal state
    modal,
    isColumnSettingsOpen: modal === "columns",
    isRowSettingsOpen: modal === "rows",

    // Commands
    openColumnSettings,
    openRowSettings,
    closeModal,

  };
}