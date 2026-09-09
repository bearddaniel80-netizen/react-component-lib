export function getFileInfo(file) {
  const path = file.webkitRelativePath || file.name;
  const parts = path.split("/");

  const fileName = parts[parts.length - 1];

  const folderName =
    parts.length > 1
      ? parts.slice(0, -1).join("/")
      : "";

  const shortName =
    fileName.length > 30
      ? `${fileName.substring(0, 27)}...`
      : fileName;

  return {
    path,
    fileName,
    shortName,
    folderName,
  };
}

export function createFileKey(file) {
  return `${file.webkitRelativePath || file.name}-${file.size}-${file.lastModified}`;
}

export function getFileIcon(file) {
  const mime = file.type || "";
  const name = file.name.toLowerCase();

  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";

  if (
    mime.includes("pdf") ||
    name.endsWith(".pdf")
  ) {
    return "pdf";
  }

  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    name.endsWith(".csv") ||
    name.endsWith(".xls") ||
    name.endsWith(".xlsx")
  ) {
    return "spreadsheet";
  }

  if (
    mime.includes("word") ||
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    name.endsWith(".txt")
  ) {
    return "text";
  }

  if (
    mime.includes("zip") ||
    mime.includes("compressed") ||
    name.endsWith(".zip") ||
    name.endsWith(".7z") ||
    name.endsWith(".rar") ||
    name.endsWith(".tar") ||
    name.endsWith(".gz")
  ) {
    return "archive";
  }

  if (
    mime.includes("javascript") ||
    mime.includes("json") ||
    mime.includes("html") ||
    mime.includes("css") ||
    name.endsWith(".js") ||
    name.endsWith(".jsx") ||
    name.endsWith(".ts") ||
    name.endsWith(".tsx") ||
    name.endsWith(".json") ||
    name.endsWith(".html") ||
    name.endsWith(".css")
  ) {
    return "code";
  }

  return "file";
}

export function createUpload(file) {
  const info = getFileInfo(file);

  return {
    key: createFileKey(file),

    name: info.fileName,
    shortName: info.shortName,

    mimeType: file.type || "unknown",
    icon: getFileIcon(file),

    size: file.size,

    path: info.path,
    folderName: info.folderName,

    progress: 0,
    uploading: false,
    completed: false,

    url: null,
    error: null,
  };
}