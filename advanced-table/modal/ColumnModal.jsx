import ModelPipeline from "../tabs/ModelPipeline";

export default function ColumnModal({
  column,
}) {
  return (
    <ModelModal
      models={column}
      pipeline={columnPipeline}
      mode="single"
    />
  );
}