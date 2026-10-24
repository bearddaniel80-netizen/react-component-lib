export default function DataRenderer({
  component: Component,
  model,
  data,
}) {
  if (!Component) {
    return null;
  }

  return (
    <Component
      {...model}
      data={data}
    />
  );
}