export default function ModelPipeline({
  models,
  pipeline,
  mode = "single",
}) {
  const items = Array.isArray(models)
    ? models
    : [models];

  const controller = useSettingsController(items);

  if (mode === "single") {
    return (
      <ModelPage
        item={items[0]}
        pages={pipeline.pages}
        controller={controller}
      />
    );
  }

  const tabs = items.map((item) => ({
    id: item.id,
    label: item.label ?? item.name ?? item.id,

    render: () => (
      <ModelTabPage
        item={item}
        pages={pipeline.pages}
        controller={controller}
      />
    ),
  }));

  return (
    <TabbedPanel
      tabs={tabs}
      defaultTab={tabs[0]?.id}
    />
  );
}