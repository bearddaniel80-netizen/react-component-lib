import Page from "./Page";

export default function ModelPage({
  item,
  pages,
  controller,
}) {
  return (
    <>
      {pages.map((page) => (
        <Page
          key={page.id}
          item={item}
          component={page.component}
          onToggle={controller[page.action]}
        />
      ))}
    </>
  );
}