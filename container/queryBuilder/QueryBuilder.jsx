import { useState, useRef, useEffect } from "react";
import ColorSwatch from "../../indicator/color/ColorSwatch";
import QueryResultsView from "../../views/QueryResultsView";
import Modal from "../../modal/Modal";
import QueryBuilderWizard from "./wizard/QueryBuilderWizard";
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
  const [wizardOpen, setWizardOpen] = useState(false);
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
            type="button"
            onClick={() => setWizardOpen(true)}
            disabled={loading}
          >
            Wizard
          </button>
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
      <QueryBuilderWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onFinish={(generatedQuery) => {
          setQuery(generatedQuery);
        }}
      />
    </div>
  );
}
