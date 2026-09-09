// uploadService.js

import { 
  eventBus,
} from "../../eventBus";

import { UPLOAD_EVENTS } from "../events/definitions";

export function uploadFile(file, index) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "relative_path",
      file.webkitRelativePath || file.name
    );

    const xhr = new XMLHttpRequest();

    eventBus.emit(UPLOAD_EVENTS.START, {
      index,
      file,
    });

    xhr.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) {
        return;
      }

      const percent = Math.round(
        (event.loaded / event.total) * 100
      );

      eventBus.emit(UPLOAD_EVENTS.PROGRESS, {
        index,
        file,
        progress: percent,
        loaded: event.loaded,
        total: event.total,
      });
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          eventBus.emit(UPLOAD_EVENTS.COMPLETE, {
            index,
            file,
            progress: 100,
            data,
          });

          resolve(data);
        } catch {
          const error = new Error("Invalid server response");

          eventBus.emit(UPLOAD_EVENTS.ERROR, {
            index,
            file,
            error: error.message,
          });

          reject(error);
        }

        return;
      }

      const error = new Error("Upload failed");

      eventBus.emit(UPLOAD_EVENTS.ERROR, {
        index,
        file,
        error: error.message,
        status: xhr.status,
      });

      reject(error);
    });

    xhr.addEventListener("error", () => {
      const error = new Error("Network error");

      eventBus.emit(UPLOAD_EVENTS.ERROR, {
        index,
        file,
        error: error.message,
      });

      reject(error);
    });

    xhr.open("POST", "/api/uploads");
    xhr.send(formData);
  });
}