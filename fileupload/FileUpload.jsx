import FileDropZone from "./FileDropZone";
import Table from "../table/Table";
import {columnModel} from "../table/column/model/column";
import { useFileUploads } from "./hooks/useFileUploads";
import { uploadFile } from "./network/uploadService";

export default function FileUpload() {
  const {
    files,
    uploads,
    addFiles,
    removeFile,
    clearFiles,
  } = useFileUploads();

  async function uploadFiles() {
    for (let i = 0; i < files.length; i++) {
      if (uploads[i]?.completed) {
        continue;
      }

      try {
        await uploadFile(
          files[i],
          i
        );
      } catch (error) {
        console.error(error);
      }
    }
  }
  const columns = columnModel;

  const uploading = uploads.some(
    (upload) => upload.uploading
  );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 20px",
      }}
    >
      <h1>Upload Files</h1>

      <FileDropZone onFiles={addFiles} />

      {uploads.length > 0 && (
        <Table
          initialColumns={columns}
          rows={uploads}
          onRemove={removeFile}
          onClear={clearFiles}
          canClear={!uploading}
        />
      )}

      {files.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <button
            type="button"
            onClick={uploadFiles}
            disabled={uploading}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Upload {files.length}{" "}
            {files.length === 1
              ? "File"
              : "Files"}
          </button>
        </div>
      )}
    </div>
  );
}