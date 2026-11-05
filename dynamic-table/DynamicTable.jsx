
import { useState, useEffect } from "react";
import Modal from "../modal/Modal";

const ROWS_PER_PAGE = 15;

export default function DynamicTable({ caption, data }) {
  const { columns, rows } = data;

  const tableRows = Array.isArray(rows) ? rows : [rows];

  const [selectedValue, setSelectedValue] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableRows.length / ROWS_PER_PAGE);

  // Keep current page valid if the data changes
  useEffect(() => {
    setCurrentPage((page) =>
      Math.min(Math.max(page, 1), Math.max(totalPages, 1))
    );
  }, [totalPages]);

  // Calculate rows for current page
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedRows = tableRows.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

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
              openModal(formatted, column.label ?? column.key);
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
          {paginatedRows.map((row, rowIndex) => (
            <tr key={row.id ?? startIndex + rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>
                  {renderCell(row[column.key], column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {Math.max(totalPages, 1)}
          {" | "}
          Showing {tableRows.length === 0 ? 0 : startIndex + 1}-
          {Math.min(startIndex + ROWS_PER_PAGE, tableRows.length)}
          {" of "}
          {tableRows.length} rows
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>

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
};
