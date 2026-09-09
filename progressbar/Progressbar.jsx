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