export default function Page({
  item,
  component,
  onToggle,
}) {
  const Component = component;

  return (
    <Component
      item={item}
      onToggle={onToggle}
    />
  );
}