# table

## Description
A datatable that is sortable.

---

## Components
Table
TableMenuBar
Row
Modal
- column
    - Colummn
    - ContextMenu
- cell
    - Action
    - File
    - Folder
    - Generic
    - Progress
    - ShortName
    - Size
    - Type

---

## Features
- navigation
    - arrow key
    - END, HOME
    - TAB, SHIFT+TAB
- visibility
    - hide
    - restore indivuals

---

## Code Use
```text
const columns = [
  {
    actionable: true,
    id: "actions",
    hideable: false,
    label: "Action",
    order: 0,
    reorderable: false,
    sortable: false,
    visible: true,
    width: 50,
  },
];
```

---

## UI Use
```text
<Table
    initialColumns={columns}
    rows={uploads}
    onRemove={removeFile}
    onClear={clearFiles}
    canClear={!uploading}
/>
```