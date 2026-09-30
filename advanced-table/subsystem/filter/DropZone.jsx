import { useState } from "react";
import { X } from "lucide-react";

export default function DropZone() {
  const [items, setItems] = useState([]);

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(event) {
    event.preventDefault();

    const data = event.dataTransfer.getData("application/json");

    if (!data) {
      return;
    }

    const item = JSON.parse(data);

    setItems((current) => {
      // Duplicate within THIS zone only
      if (current.some((existing) => existing.id === item.id)) {
        return current;
      }

      return [...current, item];
    });
  }

  function handleRemove(id) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        minWidth: 200,
        minHeight: 100,
        padding: 10,
        border: "2px dashed #aaa",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 8px",
          }}
        >
          <span>{item.label}</span>

          <button
            type="button"
            onClick={() => handleRemove(item.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}