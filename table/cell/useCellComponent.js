import FileCell from "./File";
import TypeCell from "./type/Type";
import ShortNameCell from "./ShortName";
import SizeCell from "./size/Size";
import ProgressCell from "./Progress";
import FolderCell from "./Folder";
import ActionsCell from "./Action";

export const cellComponents = {
  file: FileCell,
  type: TypeCell,
  shortName: ShortNameCell,
  size: SizeCell,
  progress: ProgressCell,
  folder: FolderCell,
  actions: ActionsCell,
};