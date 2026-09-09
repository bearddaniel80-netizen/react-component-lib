export async function readDirectory(
  entry,
  parentPath = ""
) {
  const reader = entry.createReader();

  async function readEntries() {
    return new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
  }

  const files = [];

  while (true) {
    const entries = await readEntries();

    if (entries.length === 0) {
      break;
    }

    for (const child of entries) {
      if (child.isFile) {
        const file = await getFile(child);

        const relativePath = parentPath
          ? `${parentPath}/${file.name}`
          : `${entry.name}/${file.name}`;

        setRelativePath(file, relativePath);

        files.push(file);
      }

      if (child.isDirectory) {
        const childPath = parentPath
          ? `${parentPath}/${child.name}`
          : `${entry.name}/${child.name}`;

        const nestedFiles = await readDirectory(
          child,
          childPath
        );

        files.push(...nestedFiles);
      }
    }
  }

  return files;
}

function getFile(entry) {
  return new Promise((resolve, reject) => {
    entry.file(resolve, reject);
  });
}

function setRelativePath(file, relativePath) {
  Object.defineProperty(file, "webkitRelativePath", {
    value: relativePath,
    writable: false,
  });
}

export async function getDroppedFiles(event) {
  const items = Array.from(
    event.dataTransfer.items || []
  );

  const files = [];

  for (const item of items) {
    const entry = item.webkitGetAsEntry?.();

    if (!entry) {
      const file = item.getAsFile();

      if (file) {
        files.push(file);
      }

      continue;
    }

    if (entry.isFile) {
      const file = item.getAsFile();

      if (file) {
        files.push(file);
      }

      continue;
    }

    if (entry.isDirectory) {
      const directoryFiles =
        await readDirectory(entry);

      files.push(...directoryFiles);
    }
  }

  return files;
}