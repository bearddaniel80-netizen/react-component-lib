import Page from "./Page";

export default function TabPage({
  items,
  page,
  onToggle,
}) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <Page
            item={item}
            page={page}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
}