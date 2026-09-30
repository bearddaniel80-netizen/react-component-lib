import ModelPage from "./ModelPage";

export default function ModelTabPage({
  item,
  pages,
  controller,
}) {
  return (
    <ModelPage
      item={item}
      pages={pages}
      controller={controller}
    />
  );
}