import { useEffect, useRef } from "react";
import { navigationPipeline } from "../navigation/navigationPipeline";
import { horizontalNavigation } from "../navigation/useHorizontal";
import { escapeNavigation } from "../navigation/useEscape";

export default function ContextMenu({
  x,
  y,
  model,
  onClose,
}) {
  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  const items = model;

  /*
   * Menu opens -> select first item
   */
  useEffect(() => {
    itemsRef.current[0]?.focus();
  }, []);

  /*
   * Close when clicking outside
   */
  useEffect(() => {
    function handleClick(e) {
      if (!menuRef.current?.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  /*
   * Keyboard navigation
   */
  function handleKeyDown(event, index) {
    const context = {
      event,

      rowIndex: index,
      columnIndex: 0,

      rows: items,
      columns: [0],
      visibleColumns: [0],

      navigationType: "menu",
      onEscape: onClose
    };
    
    navigationPipeline.unregister(horizontalNavigation);
    navigationPipeline.register(escapeNavigation);

    const result =
      navigationPipeline.navigate(context);

    /*
     * Navigation handler didn't handle the key.
     */
    if (!result?.handled) {
      return;
    }

    event.preventDefault();


    /*
     * Navigation handler returned a new position.
     */
    if (result.newRow !== undefined) {
      /*
       * Keep the menu selection inside the menu.
       */
      if (
        result.newRow < 0 ||
        result.newRow >= items.length
      ) {
        return;
      }

      itemsRef.current[result.newRow]?.focus();
    }
  }

  return (
    <div
      ref={menuRef}
      role="menu"
      style={{
        position: "fixed",
        left: x,
        top: y,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "4px 0",
        zIndex: 1000,
        minWidth: "160px",
      }}
    >
      {items.map((item, index) => (
        <button
          key={item.label}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          type="button"
          role="menuitem"
          tabIndex={index === 0 ? 0 : -1}
          onClick={item.onSelect}
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
          style={menuItemStyle}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

const menuItemStyle = {
  display: "block",
  width: "100%",
  border: "none",
  background: "none",
  padding: "8px 12px",
  textAlign: "left",
  cursor: "pointer",
};