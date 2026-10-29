import Carousel from "../menu/Carousel";
import HtmlFragment from "../views/HtmlFragmentsView";

const itemsModel = [
  {
    id: "manifest",
    label: "Manifest",
    endpoint: "/api/manifest/list",
  },
  {
    id: "suite",
    label: "Suite",
    endpoint: "/api/suite/list",
  },
  {
    id: "tag",
    label: "Tag",
    endpoint: "/api/tag/list",
  },
];
export default function TestHtml({ mode = "default" }) {
  return (
    <Carousel
      menuItems={itemsModel}
      mode={mode}
      component={HtmlFragment}
      model={{}}
    />
  );
}