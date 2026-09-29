import { useEffect, useRef } from "react";
export default function ContextMenu({
  x,
  y,
  onColor,
  onFreeze,
  onHide,
  onClose,
}) {
  const menuRef = useRef(null);

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
  return (
    <div
      ref={menuRef}
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
      <button
        type="button"
        onClick={onColor}
        style={menuItemStyle}
      >
        Colorize column
      </button>
      <button
        type="button"
        onClick={onFreeze}
        style={menuItemStyle}
      >
        Freeze column
      </button>
      <button
        type="button"
        onClick={onHide}
        style={menuItemStyle}
      >
        Hide column
      </button>
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