# fileupload

## Description
A drag 'n' drop fileupload.

---

## Components
FileDropZone
FileUpload

---

## Features
- link to upload single file
- button to upload folder of files
- dropzone for multiple files or folders

---

## UI Use
```text
<FileUpload/>
```

---

## Flow

```text
                    ┌──────────────────┐
                    │   FileUpload     │
                    └────────┬─────────┘
                             │
                             │ uploadFile(file, index)
                             ▼
                    ┌──────────────────┐
                    │  uploadService   │
                    │                  │
                    │      XHR         │
                    └────────┬─────────┘
                             │
                    eventBus.emit()
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
       START             PROGRESS            COMPLETE
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ useFileUploads    │
                    │                  │
                    │   setUploads()   │
                    └────────┬─────────┘
                             │
                             ▼
                         uploads
                             │
                             ▼
                         ┌───────┐
                         │ Table │
                         └───┬───┘
                             │
                             ▼
                           Row
                             │
                             ▼
                       ProgressCell
                             │
                             ▼
                       ProgressBar
```

---

```text
                    FileUpload
                         │
             ┌───────────┴───────────┐
             │                       │
       useFileUploads          FileDropZone
             │                       │
             │                    File[]
             │                       │
             └───────────┬───────────┘
                         │
                    uploads[]
                         │
                    FileTable
                         │
                    UploadManager
                         │
                    uploadFile()
                         │
                    HTTP / MinIO
```