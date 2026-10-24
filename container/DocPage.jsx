import Carousel from "../menu/Carousel";
import HtmlFragment from "../views/HtmlFragmentsView";
const itemsModel = [
  {
    id: "examples",
    label: "Examples",
    endpoint: "/api/examples/list",
  },
  {
    id: "scripts",
    label: "Scripts",
    endpoint: "/api/scripts/list",
  },
  {
    id: "sources",
    label: "Sources",
    endpoint: "/api/sources/list",
  },
];
export default function DocumentationPage() {
  return (
    <Carousel
      menuItems={itemsModel}
      component={HtmlFragment}
      model={{}}
    />
  );
}