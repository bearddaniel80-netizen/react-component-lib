import { GripVertical, Pipette, X } from "lucide-react"

export default function ActionsCell({
  row,
  index,
  onRemove,
}) {
  if (row.uploading) {
    return null;
  }

  return (
    <table>
      <tbody>
        <tr>
          <td />
          <td>
            <input type="checkbox" name="" id="" />
          </td>
          <td/>
        </tr>
        <tr>
          <td>
            <GripVertical size={10} />
          </td>
          <td>
            <button
              type="button"
              onClick={() => onRemove(index)}
              title="Remove"
            >
              <X size={10} color="red" />
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={() => onRemove(index)}
              title="Colorize row"
            >
              <Pipette size={10}/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}