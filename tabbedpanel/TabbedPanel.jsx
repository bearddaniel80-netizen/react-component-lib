import { useState } from "react";

export default function TabbedPanel({ tabs, defaultTab, pageComponents}) {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? tabs[0]?.id
  );

  const active = tabs.find(tab => tab.id === activeTab);

  if (!active) {
    return null;
  }

  const Component = active.render;

  return (
    <div className="tabbed-panel">
      <div className="tab-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <Component pageComponents={pageComponents} />
      </div>
    </div>
  );
}