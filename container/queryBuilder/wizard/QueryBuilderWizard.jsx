import { useEffect, useState } from "react";
import Modal from "../../../modal/Modal";
import DragZone from "../../../advanced-table/subsystem/filter/DragZone";
import "./QueryBuilderWizard.css";

import {
  WIZARD_VIEWS,
  REQUIRED_STEPS,
} from "./wizardConfig";

export default function QueryBuilderWizard({
  isOpen,
  onClose,
  onFinish,
}) {
  const [viewIndex, setViewIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [dropped, setDropped] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [queryParts, setQueryParts] = useState({
    source: "",
    fields: [],
    orderBy: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentView = WIZARD_VIEWS[viewIndex];

  const progress = Math.min(
    completed,
    REQUIRED_STEPS
  );

  const progressPercent =
    (progress / REQUIRED_STEPS) * 100;

  // Reset whenever the wizard opens.
  useEffect(() => {
    if (!isOpen) return;

    setViewIndex(0);
    setItems([]);
    setDropped([]);
    setCompleted(0);
    setError("");

    setQueryParts({
      source: "",
      fields: [],
      orderBy: [],
    });
  }, [isOpen]);

  // Load available sources or fields.
  useEffect(() => {
    if (!isOpen || !currentView) return;

    const controller = new AbortController();

    async function loadItems() {
      setLoading(true);
      setError("");
      setDropped([]);

      try {
        let endpoint;

        if (currentView.id === "view-1") {
          endpoint = "/api/system/list";
        } else {
          const source = queryParts.source;

          if (!source) return;

          endpoint =
            `/api/system/fields/${encodeURIComponent(source)}`;
        }

        const response = await fetch(endpoint, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load wizard items");
        }

        const data = await response.json();

        // Accept either an array or an object containing items.
        const values = Array.isArray(data)
          ? data
          : data.result ?? data.fields ?? data.sources ?? [];

        const normalized = values.map((value) => {
          const label =
            typeof value === "string"
              ? value
              : value.label ?? value.name ?? value.id;

          return {
            id: String(
              typeof value === "string"
                ? value
                : value.id ?? label
            ),
            label: String(label),
          };
        });

        // View 2 always starts with *.
        if (currentView.id === "view-2") {
          normalized.unshift({
            id: "*",
            label: "*",
          });
        }

        setItems(normalized);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => controller.abort();
  }, [
    isOpen,
    viewIndex,
    currentView,
    queryParts.source,
  ]);

  function handleDrop(item) {
    setError("");

    const isSource = currentView.id === "view-1";
    const isOrderBy = currentView.id === "view-3";
    const isWildcard = item.id === "*";

    // View 1: only one source.
    if (isSource && dropped.length >= 1) {
      alert("Only one source can be selected.");
      return;
    }

    // Prevent duplicate selections.
    if (dropped.some((existing) => existing.id === item.id)) {
      return;
    }

    // View 2: wildcard cannot coexist with named fields.
    if (!isSource && !isOrderBy) {
      if (isWildcard && dropped.length > 0) {
        alert("You cannot select * with other fields.");
        return;
      }

      if (!isWildcard && dropped.some((existing) => existing.id === "*")) {
        alert("Remove * before selecting named fields.");
        return;
      }
    }

    // View 3: wildcard is never allowed.
    if (isOrderBy && isWildcard) {
      alert("* is not allowed in ORDER BY.");
      return;
    }

    setDropped((previous) => [...previous, item]);
  }

  function removeItem(id) {
    setDropped((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function getClause() {
    const values = dropped
      .map((item) => item.label)
      .join(", ");

    switch (currentView.id) {
      case "view-1":
        return `FROM ${values}`;

      case "view-2":
        return `SELECT ${values}`;

      case "view-3":
        return values ? `ORDER BY ${values}` : "";

      default:
        return "";
    }
  }

  function handleNext() {
    if (!dropped.length) return;

    const clause = getClause();

    const updatedParts = {
      ...queryParts,
      ...(currentView.id === "view-1" && {
        source: dropped[0].label,
      }),
      ...(currentView.id === "view-2" && {
        fields: dropped,
      }),
      ...(currentView.id === "view-3" && {
        orderBy: dropped,
      }),
    };

    setQueryParts(updatedParts);

    if (!currentView.optional) {
      setCompleted((previous) => previous + 1);
    }

    setViewIndex((previous) => previous + 1);
  }

  function handleFinish() {
    const canFinish =
      progress >= REQUIRED_STEPS ||
      currentView.optional;

    if (!canFinish) return;

    // Include the current optional view if selected.
    const finalParts = {
      ...queryParts,
      ...(currentView.id === "view-3" && {
        orderBy: dropped,
      }),
    };

    const clauses = [
      finalParts.fields.length
        ? `SELECT ${finalParts.fields
            .map((item) => item.label)
            .join(", ")}`
        : null,

      finalParts.source
        ? `FROM ${finalParts.source}`
        : null,

      finalParts.orderBy.length
        ? `ORDER BY ${finalParts.orderBy
            .map((item) => item.label)
            .join(", ")}`
        : null,
    ].filter(Boolean);

    onFinish(clauses.join("\n"));
    onClose();
  }

  const canNext =
    dropped.length > 0 &&
    viewIndex < WIZARD_VIEWS.length - 1;

  const canFinish =
    progress >= REQUIRED_STEPS ||
    currentView.optional;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Query Builder Wizard"
    >
      <div className="wizard">

        <div className="wizard-query">
          <label>Query:</label>
          <pre>
            {[
              queryParts.fields.length &&
                `SELECT ${queryParts.fields
                  .map((item) => item.label)
                  .join(", ")}`,
              queryParts.source &&
                `FROM ${queryParts.source}`,
              currentView.id === "view-3" &&
                dropped.length &&
                `ORDER BY ${dropped
                  .map((item) => item.label)
                  .join(", ")}`,
              queryParts.orderBy.length &&
                currentView.id !== "view-3" &&
                `ORDER BY ${queryParts.orderBy
                  .map((item) => item.label)
                  .join(", ")}`,
            ]
              .filter(Boolean)
              .join("\n")}
          </pre>
        </div>

        <div className="wizard-progress">
          <progress
            value={progressPercent}
            max="100"
          />
          <span>
            {progress} / {REQUIRED_STEPS}
          </span>
        </div>

        <h3>
          {currentView.label}
          {currentView.optional && " (Optional)"}
        </h3>

        {loading && <p>Loading...</p>}

        {error && (
          <div className="wizard-error">
            {error}
          </div>
        )}

        <div className="wizard-zones">

          <div className="wizard-drag-zone">
            <h4>
              {currentView.id === "view-1"
                ? "Sources"
                : "Fields"}
            </h4>

            {items.map((item) => (
              <DragZone
                key={item.id}
                item={item}
              />
            ))}
          </div>

          <div className="wizard-drop-zone">
            <h4>Selected</h4>

            <div
              className="drop-area"
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={(event) => {
                event.preventDefault();

                try {
                  const item = JSON.parse(
                    event.dataTransfer.getData(
                      "application/json"
                    )
                  );

                  handleDrop(item);
                } catch {
                  setError("Invalid drag-and-drop item.");
                }
              }}
            >
              {dropped.map((item) => (
                <div
                  key={item.id}
                  className="dropped-item"
                >
                  <span>{item.label}</span>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}

              {dropped.length === 0 && (
                <span className="drop-placeholder">
                  Drag items here
                </span>
              )}
            </div> 
          </div>

        </div>

        <div className="wizard-actions">

          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext || loading}
          >
            Next
          </button>

          <button
            type="button"
            onClick={handleFinish}
            disabled={!canFinish || loading}
          >
            Finish
          </button>

        </div>

      </div>
    </Modal>
  );
}