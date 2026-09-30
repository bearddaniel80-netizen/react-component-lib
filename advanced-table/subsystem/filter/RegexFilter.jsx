import { useMemo, useState } from "react";
import { Filter, X } from "lucide-react";

function RegexFilter({
  value,
  onChange,
  totalCount,
  matchCount,
  label = "Filter",
  placeholder = "Regular expression...",
}) {
  const [open, setOpen] = useState(false);

  const error = useMemo(() => {
    if (!value?.trim()) {
      return null;
    }

    try {
      new RegExp(value);
      return null;
    } catch {
      return "Invalid regular expression";
    }
  }, [value]);

  function clear() {
    onChange("");
  }

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        title={`Filter ${label}`}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "3px",
          display: "flex",
          alignItems: "center",
          color: value ? "#2196f3" : "#666",
        }}
      >
        <Filter size={15} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: "0",
            zIndex: 1000,
            width: "300px",
            padding: "12px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontWeight: "normal",
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <strong>{label} Filter</strong>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "2px",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Regex input */}
          <input
            autoFocus
            type="text"
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            placeholder={placeholder}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px",
              border: error
                ? "1px solid red"
                : "1px solid #ccc",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          />

          {/* Error / count */}
          {error ? (
            <div
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              {error}
            </div>
          ) : (
            <div
              style={{
                color: "#666",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              {matchCount} of {totalCount}{" "}
              {totalCount === 1
                ? "file"
                : "files"}
            </div>
          )}

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              onClick={clear}
              disabled={!value}
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegexFilter;