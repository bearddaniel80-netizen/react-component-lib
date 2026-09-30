import { useState, useEffect, useRef } from "react";
import { navigationPipeline } from "../subsystem/navigation/navigationPipeline";
import { verticalNavigation } from "../subsystem/navigation/useVertical";
import { enterNavigation } from "../subsystem/navigation/useEnter";

export default function TabbedPanel({
  tabs,
  defaultTab,
  pageComponents,
}) {
  const initialTab = defaultTab ?? tabs[0]?.id;

  const [activeTab, setActiveTab] = useState(initialTab);

  const itemsRef = useRef([]);

  /*
   * Select first tab when panel opens
   */
  useEffect(() => {
    itemsRef.current[0]?.focus();
  }, []);

  /*
   * Activate a tab
   */
  function openTab(index) {
    const tab = tabs[index];

    if (!tab) {
      return;
    }

    setActiveTab(tab.id);
  }

  /*
   * Keyboard navigation
   */
  function handleKeyDown(event, index) {
    const context = {
      event,

      rowIndex: index,
      columnIndex: 0,

      rows: tabs,
      columns: [0],
      visibleColumns: [0],

      navigationType: "tabs",
      onEnter: (context) => {
        openTab(context.columnIndex);
      }
    };
    navigationPipeline.unregister(verticalNavigation);
    navigationPipeline.register(enterNavigation);
    const result =
      navigationPipeline.navigate(context);

    /*
     * Pipeline didn't handle the key.
     */
    if (!result?.handled) {
      return;
    }

    event.preventDefault();


    /*
     * Navigation returned a new position.
     */
    if (result.newRow !== undefined) {
      /*
       * Keep selection inside the tabs.
       */
      if (
        result.newRow < 0 ||
        result.newRow >= tabs.length
      ) {
        return;
      }

      itemsRef.current[result.newRow]?.focus();
    }
  }

  const active = tabs.find(
    (tab) => tab.id === activeTab
  );

  if (!active) {
    return null;
  }

  const Component = active.render;

  return (
    <div className="tabbed-panel">

      <div className="tab-bar">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            type="button"
            tabIndex={index === 0 ? 0 : -1}
            className={
              tab.id === activeTab
                ? "active"
                : ""
            }
            onClick={() => openTab(index)}
            onKeyDown={(event) =>
              handleKeyDown(event, index)
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <Component
          pageComponents={pageComponents}
        />
      </div>

    </div>
  );
}