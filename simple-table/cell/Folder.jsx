export default function FolderCell({ row }) {
  return (
    <span
      style={{
        fontSize: "12px",
        color: row.folderName
          ? "#555"
          : "#aaa",
      }}
      title={row.folderName}
    >
      {row.folderName || "—"}
    </span>
  );
}