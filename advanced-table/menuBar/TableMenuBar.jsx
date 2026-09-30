// TableMenuBar.jsx
import { File, FileOutput, Settings } from "lucide-react";
import Modal from "../../modal/Modal";

export default function TableMenuBar({
  columns,
  rows
}) {
const menuItems = [
  {
    id: "columns",
    text: "Columns",
    title: "Column Settings",
    models: columns,
    pipeline: columnPipeline,
    mode: "collection",
  },

  {
    id: "rows",
    text: "Rows",
    title: "Row Settings",
    models: rows,
    pipeline: rowPipeline,
    mode: "collection",
  },
];
  return (
    <>
      <div style={menuBarStyle}>

        <div>
          <File size={18} />
          <strong>Files</strong>
        </div>

        <div>
          <FileOutput size={18} />
          <strong>Export</strong>
        </div>
        {menuItems.map((item) => (
          <Modal
            key={item.id}
            isOpen={item.open}
            onClose={closeModal}
            title={item.title}
          >
            <ModelPipeline
              models={item.models}
              pipeline={item.pipeline}
              mode={item.mode}
            />
          </Modal>
        ))}

      </div>
    </>
  );
}
const menuBarStyle = { display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", border: "1px solid #ddd", borderBottom: "none", };
const menuActionsStyle = { display: "flex", gap: "6px", };
const buttonStyle = { display: "flex", alignItems: "center", gap: "6px", padding: "5px 8px", border: "none", background: "transparent", cursor: "pointer", };
const separator = { width: "1px", height: "20px", background: "#ccc", margin: "0 8px", };//