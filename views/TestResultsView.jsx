import DynamicTable from "../dynamic-table/DynamicTable";

export default function TestResultsView({
  data,
  model = {},
}) {
  return (
    <>
      <DynamicTable
        caption="Summary"
        data={{
          columns: data.summary_columns,
          rows: data.summary,
        }}
      />

      {data.query_performance_columns && (
        <DynamicTable
          caption="Slowest Query"
          data={{
            columns: data.query_performance_columns,
            rows: data.query_performance,
          }}
        />
      )}

      {data.failures_columns && (
        <DynamicTable
          caption="Failures"
          data={{
            columns: data.failures_columns,
            rows: data.failures,
          }}
        />
      )}

      <DynamicTable
        caption="Test Results"
        data={{
          columns: data.results_columns,
          rows: data.results,
        }}
      />
    </>
  );
}