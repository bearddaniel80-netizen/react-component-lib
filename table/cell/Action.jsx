import { X } from "lucide-react"

export default function ActionsCell({
  row,
  index,
  onRemove,
}) {
  if (row.uploading) {
    return null;
  }

  return (
            <button
              type="button"
              onClick={() => onRemove(index)}
              title="Remove"
            >
              <X size={10} color="red" />
            </button>
  );
}