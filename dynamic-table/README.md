# dynamic table

## Description
Build table from api response.

---

## Components
Modal

---

## Features
- format cell values
- truncates string values

---

## UI Use
```text
<DynamicTable 
     caption={"table name"}
     data={
            {
              "columns": selectedData.summary_columns,
              "rows": selectedData.summary
            }
     }
/>
```