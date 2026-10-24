import Carousel from "../menu/Carousel";
import TestResultsView from "../views/TestResultsView";

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
export default function TestDashboard({ mode = "default" }) {
  return (
    <Carousel
      menuItems={itemsModel}
      mode={mode}
      component={TestResultsView}
      model={{}}
    />
  );
}