export default function ProgressCell({ row }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "14px",
            backgroundColor: "#eee",
            borderRadius: "7px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${row.progress}%`,
              height: "100%",
              backgroundColor: row.completed
                ? "#4caf50"
                : "#2196f3",
              transition: "width 0.2s ease",
            }}
          />
        </div>

        <span
          style={{
            width: "40px",
            fontSize: "12px",
          }}
        >
          {row.progress}%
        </span>
      </div>

      {row.error && (
        <div
          style={{
            color: "red",
            fontSize: "11px",
            marginTop: "3px",
          }}
        >
          {row.error}
        </div>
      )}

      {row.completed && row.url && (
        <a
          href={row.url}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: "11px" }}
        >
          View
        </a>
      )}
    </>
  );
}