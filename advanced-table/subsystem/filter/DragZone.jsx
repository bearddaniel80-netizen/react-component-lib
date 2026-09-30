

export default function DragZone({ item }) {
  function handleDragStart(event) {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify(item)
    );

    event.dataTransfer.effectAllowed = "copy";
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        display: "inline-flex",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab",
      }}
    >
      {item.label}
    </div>
  );
}