import DynamicTable from "../dynamic-table/DynamicTable";

export default function QueryResultsView({
  data,
  model = {},
}) {
  return (
      <DynamicTable
        caption="Query Results"
        data={{
          columns: data.columns,
          rows: data.results,
        }}
      />
  );
}