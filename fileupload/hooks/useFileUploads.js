import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createFileKey,
  createUpload,
} from "../io/fileUtils";

import {
  eventBus,
} from "../../eventBus";

import { UPLOAD_EVENTS } from "../events/definitions"

export function useFileUploads() {
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState([]);

  const addFiles = useCallback((newFiles) => {
    setFiles((currentFiles) => {
      const existing = new Set(
        currentFiles.map(createFileKey)
      );

      const uniqueFiles = newFiles.filter((file) => {
        const key = createFileKey(file);

        if (existing.has(key)) {
          return false;
        }

        existing.add(key);

        return true;
      });

      if (uniqueFiles.length === 0) {
        return currentFiles;
      }

      setUploads((currentUploads) => [
        ...currentUploads,
        ...uniqueFiles.map(createUpload),
      ]);

      return [
        ...currentFiles,
        ...uniqueFiles,
      ];
    });
  }, []);

  /*
   * Listen for upload events.
   */
  useEffect(() => {
    const handleStart = ({
      index,
    }) => {
      setUploads((current) =>
        current.map((upload, i) =>
          i === index
            ? {
                ...upload,
                uploading: true,
                completed: false,
                error: null,
                progress: 0,
              }
            : upload
        )
      );
    };

    const handleProgress = ({
      index,
      progress,
    }) => {
      setUploads((current) =>
        current.map((upload, i) =>
          i === index
            ? {
                ...upload,
                progress,
                uploading: true,
              }
            : upload
        )
      );
    };

    const handleComplete = ({
      index,
      progress,
      data,
    }) => {
      setUploads((current) =>
        current.map((upload, i) =>
          i === index
            ? {
                ...upload,
                progress: progress ?? 100,
                uploading: false,
                completed: true,
                error: null,
                data,
              }
            : upload
        )
      );
    };

    const handleError = ({
      index,
      error,
    }) => {
      setUploads((current) =>
        current.map((upload, i) =>
          i === index
            ? {
                ...upload,
                uploading: false,
                completed: false,
                error,
              }
            : upload
        )
      );
    };

    eventBus.on(
      UPLOAD_EVENTS.START,
      handleStart
    );

    eventBus.on(
      UPLOAD_EVENTS.PROGRESS,
      handleProgress
    );

    eventBus.on(
      UPLOAD_EVENTS.COMPLETE,
      handleComplete
    );

    eventBus.on(
      UPLOAD_EVENTS.ERROR,
      handleError
    );

    return () => {
      eventBus.off(
        UPLOAD_EVENTS.START,
        handleStart
      );

      eventBus.off(
        UPLOAD_EVENTS.PROGRESS,
        handleProgress
      );

      eventBus.off(
        UPLOAD_EVENTS.COMPLETE,
        handleComplete
      );

      eventBus.off(
        UPLOAD_EVENTS.ERROR,
        handleError
      );
    };
  }, []);

  const removeFile = useCallback((index) => {
    setFiles((current) =>
      current.filter((_, i) => i !== index)
    );

    setUploads((current) =>
      current.filter((_, i) => i !== index)
    );
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setUploads([]);
  }, []);

  return {
    files,
    uploads,

    addFiles,
    removeFile,
    clearFiles,
  };
}