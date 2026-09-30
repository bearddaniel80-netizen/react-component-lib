import Modal from "../../modal/Modal";
import Page from "../tabs/Page";
import TabbedPanel from "../tabs/TabbedPanel";
import { useSettingsController } from "../subsystem/settings/controller/useSettingsController";

export default function ModelModal({
  model,
  models = [],
  pipeline,
  mode = "single",
  isOpen,
  onClose,
  title,
}) {
  const items = mode === "single"
    ? [model]
    : models;

  const controller = useSettingsController(items);

  function getAction(page) {
    return controller[page.action];
  }

  if (!isOpen) {
    return null;
  }

  /*
   * Single model:
   *
   * Modal
   *   └── Page
   */
  if (mode === "single") {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
      >
        {pipeline.pages.map((page) => (
          <Page
            key={page.id}
            item={model}
            component={page.component}
            onToggle={getAction(page)}
          />
        ))}
      </Modal>
    );
  }

  /*
   * Collection:
   *
   * Modal
   *   └── TabPanel
   *         └── TabPage
   *               └── Page
   */
  const tabs = items.map((item) => ({
    id: item.id,
    label: item.label ?? item.name ?? item.id,

    render: () => (
      <div>
        {pipeline.pages.map((page) => (
          <Page
            key={page.id}
            item={item}
            component={page.component}
            onToggle={getAction(page)}
          />
        ))}
      </div>
    ),
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <TabbedPanel
        tabs={tabs}
        defaultTab={tabs[0]?.id}
      />
    </Modal>
  );
}