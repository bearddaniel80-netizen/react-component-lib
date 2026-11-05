Add an active button before 'Run' label it 'Wizard'
When the wizard button is clicked it will open a modal window

The modal will look like this:
--------------------------
| Query Builder Wizard x |
|                        |
| Query:                 |
| <Progress bar>.        |
|                        |
| <View>                 |
|                        |
| <button text=Next>     |
| <button text=Finish>   |
--------------------------
When 'x' is clicked, modal closes nothing happens.
The views could use a Model schema like this:
{
    [
        { "id": "view-1", "optional": False},
        { "id": "view-2", "optional": False},
        { "id": "view-3", "optional": True},
    ]
}
The <Progress bar> could get its max from counting number of entries where
"optional" === False.
'Next' remains disabled until <Drop Zone> is populated
Each time 'Next' is clicked:
- update query
- update <Progress bar>
- switch to next view
'Finish' remains disabled until <Progress bar> is full or View becomes optional.
When 'Finish' is clicked, modal closes and textarea in <QueryBuilder> is populated with query from modal.

View #1
--------------------------
| Source: <Drag Zone>    |
|         <Drop Zone>    |
--------------------------
# Endpoint
The <Drag Zone> is populated by this endpoint /api/system/list

# Business Rule
Only 1 source can be in the <Drop Zone> at a time so a popup should warn the user if they try to do this.

# Moving on
When 'Next' is clicked it should update the query in the modal like so:
FROM <Drop Zone> object.

View #2
--------------------------
| Fields: <Drag Zone>    |
|         <Drop Zone>    |
--------------------------
# Endpoint
The <Drag Zone> is populated by this endpoint /api/system/fields/:source

# Business Rule
- By default, <Drag Zone> always gets a '*'.
- The :source is whatever was in the <Drop Zone> in View #1.
- '*' is not allowed in <Drop Zone> if there is another field present, the user
should get a popup.
- if '*' is already in <Drop Zone> and the user tries to add a named field, the user should get a popup.
- multi named fields will be seperated with coma and space

# Moving on
When 'Next' is clicked it should update the query in the modal like so:
SELECT <Drop Zone> object.

View #3
--------------------------
| Fields: <Drag Zone>    |
|         <Drop Zone>    |
--------------------------
# Endpoint
The <Drag Zone> is populated by this endpoint /api/system/fields/:source

# Business Rule
- The :source is whatever was in the <Drop Zone> in View #1.
- '*' is not allowed in <Drop Zone>, the user should get a popup.
- multi named fields will be seperated with coma and space

# Moving on
When 'Next' is clicked it should update the query in the modal like so:
ORDER BY <Drop Zone> object.

// Modal.jsx
import './Modal.css'; 

export default function Modal({ isOpen, onClose, title, children }) {
  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents the modal from closing when clicking inside the content box */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// Progressbar.jsx
import { useEffect, useState } from "react";
import {
  eventBus,
} from "../../eventBus";

import {
  UPLOAD_EVENTS,
} from "../fileupload/network/uploadService";

export function ProgressBar({ index }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribeStart = eventBus.on(
      UPLOAD_EVENTS.START,
      (event) => {
        if (event.index !== index) return;

        setUploading(true);
        setCompleted(false);
        setError(null);
        setProgress(0);
      }
    );

    const unsubscribeProgress = eventBus.on(
      UPLOAD_EVENTS.PROGRESS,
      (event) => {
        if (event.index !== index) return;

        setProgress(event.progress);
      }
    );

    const unsubscribeComplete = eventBus.on(
      UPLOAD_EVENTS.COMPLETE,
      (event) => {
        if (event.index !== index) return;

        setProgress(100);
        setUploading(false);
        setCompleted(true);
      }
    );

    const unsubscribeError = eventBus.on(
      UPLOAD_EVENTS.ERROR,
      (event) => {
        if (event.index !== index) return;

        setUploading(false);
        setError(event.error);
      }
    );

    return () => {
      unsubscribeStart();
      unsubscribeProgress();
      unsubscribeComplete();
      unsubscribeError();
    };
  }, [index]);

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      <progress value={progress} max="100" />

      <span>
        {completed
          ? "Complete"
          : uploading
            ? `${progress}%`
            : ""}
      </span>
    </div>
  );
}

// DragZone.jsx

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

// DropZone.jsx
import { useState } from "react";
import { X } from "lucide-react";

export default function DropZone() {
  const [items, setItems] = useState([]);

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(event) {
    event.preventDefault();

    const data = event.dataTransfer.getData("application/json");

    if (!data) {
      return;
    }

    const item = JSON.parse(data);

    setItems((current) => {
      // Duplicate within THIS zone only
      if (current.some((existing) => existing.id === item.id)) {
        return current;
      }

      return [...current, item];
    });
  }

  function handleRemove(id) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        minWidth: 200,
        minHeight: 100,
        padding: 10,
        border: "2px dashed #aaa",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 8px",
          }}
        >
          <span>{item.label}</span>

          <button
            type="button"
            onClick={() => handleRemove(item.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

// QueryBuilder.jsx
import { useState, useRef, useEffect } from "react";
import ColorSwatch from "../../indicator/color/ColorSwatch";
import QueryResultsView from "../../views/QueryResultsView";
import Modal from "../../modal/Modal";
import "./QueryBuilder.css";

const POLL_INTERVAL = 2000;
const MAX_EXECUTION_TIME = 5 * 60 * 1000;
const STATUS_COLORS = {
  completed: "green",
  failed: "red",
  cancelled: "yellow",
  running: "#999",
};

export default function QueryBuilder() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const controllerRef = useRef(null);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);
  const delay = (ms, signal) => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }

      const timer = setTimeout(() => {
        signal.removeEventListener("abort", abort);
        resolve();
      }, ms);

      const abort = () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      };

      signal.addEventListener("abort", abort, { once: true });
    });
  };

  const updateHistoryStatus = (id, status) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };
  const runQuery = async () => {
    if (!query.trim() || loading) return;

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    const { signal } = controller;
    const submittedQuery = query;

    setLoading(true);
    setError("");
    setResults(null);
    setStatus("Submitting query...");

    // Add query to history
    const historyItem = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      query: submittedQuery,
      status: "running"
    };

    setHistory(prev => [historyItem, ...prev]);

    const startTime = Date.now();

    try {
      const postResponse = await fetch(`/api/query/submit/${encodeURIComponent(submittedQuery)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });

      if (!postResponse.ok) {
        throw new Error("Query submission failed");
      }

      const job = await postResponse.json();

      if (!job.jobId) {
        throw new Error("Missing job ID");
      }

      setStatus(`Query submitted: ${job.jobId}`);

      while (true) {
        if (Date.now() - startTime > MAX_EXECUTION_TIME) {
          throw new Error("Query execution timed out");
        }

        await delay(POLL_INTERVAL, signal);

        const response = await fetch(
          `/api/query/results/${encodeURIComponent(job.jobId)}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve query results");
        }

        const data = await response.json();

        if (data.status === "completed") {
          setResults({
            columns: data.columns ?? [],
            results: data.results ?? [],
          });

          updateHistoryStatus(historyItem.id, "completed");

          setStatus("Query completed successfully.");
          break;
        }

        if (data.status === "failed") {
          throw new Error(data.error || "Query failed");
        }

        if (!["pending", "running", "queued"].includes(data.status)) {
          throw new Error(`Unknown status: ${data.status}`);
        }

        setStatus(`Query ${data.status}...`);
      }

    } catch (err) {
      if (err.name === "AbortError") {
        updateHistoryStatus(historyItem.id, "cancelled");
      } else {
        updateHistoryStatus(historyItem.id, "failed");
        setError(err.message);
        setStatus("Query failed.");
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  };

  const cancelQuery = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setLoading(false);
    setStatus("Query cancelled.");
  };

  const selectHistoryQuery = (item) => {
    setQuery(item.query);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const abbreviateQuery = (value) => {
    return value.length > 10
      ? `${value.substring(0, 10)}...`
      : value;
  };

  return (
    <div className="query-builder">

      {/* Query Editor */}
      <div className="query-input">
        <label htmlFor="query">AQL Query</label>

        <textarea
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          rows={6}
          disabled={loading}
        />
        <div className="query-actions">
          <button
            onClick={runQuery}
            disabled={loading || !query.trim()}
          >
            {loading ? "Running..." : "Run Query"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={cancelQuery}
            disabled={!loading}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Status */}
      {status && (
        <div className="query-status">{status}</div>
      )}

      {error && (
        <div className="query-error">{error}</div>
      )}

      {/* Query History */}
      <div className="query-history">
        <h3>Query History</h3>

        {/* Status Legend */}
        <div className="status-legend">
          <span>
            <ColorSwatch color="green" title="Successful" />
            Successful
          </span>

          <span>
            <ColorSwatch color="red" title="Failed" />
            Failed
          </span>

          <span>
            <ColorSwatch color="yellow" title="Cancelled" />
            Cancelled
          </span>

          <span>
            <ColorSwatch color="#999" title="Running" />
            Running
          </span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Query</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                onClick={() => selectHistoryQuery(item)}
                className="history-row"
              >
                <td>
                  {formatTimestamp(item.timestamp)}
                </td>

                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedQuery(item.query);
                    }}
                  >
                    {abbreviateQuery(item.query)}
                  </a>
                </td>

                <td>
                  <ColorSwatch
                    color={STATUS_COLORS[item.status] || "#999"}
                    title={item.status}
                  />
                </td>
              </tr>
            ))}

            {history.length === 0 && (
              <tr>
                <td colSpan={3}>
                  No query history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Results */}
      {results && (
        <div className="query-results">
          <QueryResultsView data={results} />
        </div>
      )}

      {/* Full Query Modal */}
      <Modal
        isOpen={selectedQuery !== null}
        onClose={() => setSelectedQuery(null)}
        title="Full Query"
      >
        <pre className="full-query">
          {selectedQuery}
        </pre>
      </Modal>

    </div>
  );
}

// eventBus.js
/**
 * A simple event bus built on top of the browser's EventTarget API.
 *
 * Allows different parts of the application to communicate through
 * named events without needing direct references to each other.
 *
 * @class EventBus
 *
 * @example
 * const unsubscribe = eventBus.on("upload:progress", ({ index, progress }) => {
 *   console.log(`File ${index}: ${progress}%`);
 * });
 *
 * eventBus.emit("upload:progress", {
 *   index: 0,
 *   progress: 50
 * });
 *
 * unsubscribe();
 */
class EventBus extends EventTarget {

  /**
   * Emit an event with optional data.
   *
   * @param {string} event - Name of the event to emit.
   * @param {*} [detail] - Data to pass to event listeners.
   * @returns {void}
   *
   * @example
   * eventBus.emit("upload:start", {
   *   index: 0,
   *   file
   * });
   */
  emit(event, detail) {
    this.dispatchEvent(
      new CustomEvent(event, { detail })
    );
  }

  /**
   * Register a listener for an event.
   *
   * @param {string} event - Name of the event to listen for.
   * @param {Function} handler - Function called when the event is emitted.
   * @returns {Function} A cleanup function that removes the listener.
   *
   * @example
   * const unsubscribe = eventBus.on(
   *   "upload:progress",
   *   ({ index, progress }) => {
   *     console.log(index, progress);
   *   }
   * );
   *
   * // Later:
   * unsubscribe();
   */
  on(event, handler) {
    const listener = (e) => handler(e.detail);

    this.addEventListener(event, listener);

    // Return cleanup function
    return () => {
      this.removeEventListener(event, listener);
    };
  }

  /**
   * Remove an event listener.
   *
   * @param {string} event - Name of the event.
   * @param {Function} handler - Function that was registered as the listener.
   * @returns {void}
   */
  off(event, handler) {
    // Implementation goes here
  }
}

/**
 * Global application event bus.
 *
 * @type {EventBus}
 */
export const eventBus = new EventBus();