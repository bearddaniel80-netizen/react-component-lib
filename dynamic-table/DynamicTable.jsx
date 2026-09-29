import { useState } from "react";
import Modal from "../modal/Modal";

export default function DynamicTable({ caption, data }) {
  const { columns, rows } = data;

  const tableRows = Array.isArray(rows) ? rows : [rows];

  const [selectedValue, setSelectedValue] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const formatValue = (value, type) => {
    if (value == null) return "";

    switch (type) {
      case "date":
        return new Date(value).toLocaleDateString();

      case "boolean":
        return value ? "Yes" : "No";

      case "number":
        return value.toLocaleString();

      default:
        return String(value);
    }
  };

  const openModal = (value, title) => {
    setSelectedValue(String(value));
    setModalTitle(title);
  };

  const closeModal = () => {
    setSelectedValue(null);
    setModalTitle("");
  };

  const renderCell = (value, column) => {
    const formatted = formatValue(value, column.type);

    // Don't truncate dates, booleans, or numbers
    const isText =
      column.type !== "date" &&
      column.type !== "boolean" &&
      column.type !== "number";

    if (isText && formatted.length > 25) {
      return (
        <>
          {formatted.substring(0, 10)}{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              openModal(
                formatted,
                column.label ?? column.key
              );
            }}
          >
            ...
          </a>
        </>
      );
    }

    return formatted;
  };

  return (
    <>
      <table border="1">
        <caption>{caption}</caption>

        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.label ?? column.key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>
                  {renderCell(
                    row[column.key],
                    column
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={selectedValue !== null}
        onClose={closeModal}
        title={modalTitle}
      >
        <div style={fullCellValueStyle}>
          {selectedValue}
        </div>
      </Modal>
    </>
  );
}
const fullCellValueStyle = {
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  maxHeight: "60vh",
  overflowY: "auto"
}