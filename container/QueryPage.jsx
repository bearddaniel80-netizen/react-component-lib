import Carousel from "../menu/Carousel";
import QueryResultsView from "../views/QueryResultsView";

const itemsModel = [
  {
    id: "system",
    label: "System Sources",
    endpoint: "/api/system/list",
  },
];
export default function QueryDashboard({ mode = "default" }) {
  return (
    <Carousel
      menuItems={itemsModel}
      mode={mode}
      component={QueryResultsView}
      model={{}}
    />
  );
}