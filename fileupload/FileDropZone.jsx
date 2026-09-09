import { useRef, useState } from "react";
import { getDroppedFiles } from "./io/directoryUtils";

export default function FileDropZone({ onFiles }) {
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  function handleFileChange(event) {
    const files = Array.from(
      event.target.files || []
    );

    onFiles(files);

    event.target.value = "";
  }

  async function handleDrop(event) {
    event.preventDefault();

    setDragging(false);

    const files = await getDroppedFiles(event);

    onFiles(files);
  }

  function handleDragOver(event) {
    event.preventDefault();

    event.dataTransfer.dropEffect = "copy";

    setDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();

    if (
      !event.currentTarget.contains(
        event.relatedTarget
      )
    ) {
      setDragging(false);
    }
  }

  return (
    <div>
      <div
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          fileInputRef.current?.click()
        }
        style={{
          border: `2px dashed ${
            dragging ? "#2196f3" : "#aaa"
          }`,
          borderRadius: "10px",
          padding: "40px",
          textAlign: "center",
          backgroundColor: dragging
            ? "#f0f8ff"
            : "#fafafa",
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: "40px" }}>
          📁
        </div>

        <h3>
          {dragging
            ? "Drop files or folders here"
            : "Drag & Drop Files or Folders"}
        </h3>

        <p style={{ color: "#666" }}>
          or click to select files
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          type="button"
          onClick={() =>
            folderInputRef.current?.click()
          }
        >
          📂 Select Folder
        </button>

        <input
          ref={folderInputRef}
          type="file"
          multiple
          webkitdirectory=""
          directory=""
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}