import { useState } from "react";
import { columnPipeline } from "../subsystem/events/columnPipeline";
import { useMenuBarController } from "../menuBar/controller/useMenuBarController";
import { 
  GripVertical,
  Settings 
} from "lucide-react";

import ContextMenu from "../subsystem/contextMenu/ContextMenu";
import Modal from "../../modal/Modal";
import ColumnModal from "../modal/ColumnModal";
import { contextMenuModel } from "./model/contextMenuModel";

export default function Column({ column }) {
  const [menu, setMenu] = useState(null);
  const  controller = useMenuBarController(column, column)

  function freezeColumn(){
    console.log("Freeze column: ", column.label);
  }

  function hideColumn() {
      columnPipeline.emit(
        column,
        "hidden",
        true
      );
    if(column.hideable)
      column.visible = false;
  }

  if (column.visible === false) {
    return null;
  }

  function handleContextMenu(e) {
    e.preventDefault();

    setMenu({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handleOpenColumnMenu(e){
    console.log("Some model");
  }
  if(!column.actionable)
{  return (
    <>
      <th
        style={{
          ...thStyle,
          ...(column.width ? { width: column.width } : {}),
          background: column.background,
        }}
        onContextMenu={handleContextMenu}
      >
        {column.label}
      <table>
        <tbody>
          <tr>
            <td><GripVertical size={12}/></td>
            <td>
            <button onClick={controller.openColumnSettings} title="Column settings">
              <Settings
                size={12}
                strokeWidth={2}
                className="settings-icon"
              />
            </button>
            </td>
          </tr>
        </tbody>
      </table>
      </th>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          model={ contextMenuModel(freezeColumn, hideColumn) }
          onClose={() => setMenu(null)}
        />
      )}
        <Modal
          isOpen={controller.isColumnSettingsOpen}
          onClose={controller.closeModal}
          title="Column Settings"
        >
          <ColumnModal column={column}/>
        </Modal>
    </>
  );
  }
  return (
      <th
        style={{
          ...thStyle,
          ...(column.width ? { width: column.width } : {}),
          background: column.background,
        }}
      >
        {column.label}
        <input type="checkbox" name="" id="" />
      </th>
  );
}
const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontSize: "13px",
  fontWeight: "600",
  whiteSpace: "nowrap",
};