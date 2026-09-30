import DropZone from "../filter/DropZone";

import DragZone from "../filter/DragZone";
import { filters } from "../filter/filterModel";
import { ListFilter} from "lucide-react";

export default function Filter({item, onToggle}) {
  function handleChange(value) {
    return onToggle(item.id, "regex");
  }

  return (
    <>
    <div style={filterTabStyle}>
      <ListFilter/>
      <span>{item.label}</span>
        <span>
          {filters.map((filter) => <DragZone item={filter} />)}
        </span>
      <span>
        <DropZone onChange={handleChange}/>
      </span>
    </div>
    </>
  );
}
const filterTabStyle = {
  display: "grid",
  gridTemplateColumns: "50px 80px 80px 1fr",
  gap: "16px"
}