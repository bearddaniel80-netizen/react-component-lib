import { useState } from "react";
import CarouselSubmenu from "./CarouselSubmenu";
import DynamicTable from "../dynamic-table/DynamicTable";
import "./Carousel.css";

async function myList(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

const menuItems = [
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

export default function CarouselMenu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  async function handleMenuClick(menu) {
    // Close the active menu if clicked again
    if (activeMenu === menu.id) {
      setActiveMenu(null);
      return;
    }

    setActiveMenu(menu.id);
    setItems([]);
    setError(null);
    setLoading(true);

    try {
      const data = await myList(menu.endpoint);
      setItems(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const activeItem = menuItems.find(
    (item) => item.id === activeMenu
  );
  async function handleSubmenuSelect(item) {
    const endpoint = `/api/${activeMenu}/${item}`;

    setLoading(true);
    setError(null);

    try {
      const data = await myList(endpoint);

      console.log("Endpoint response:", data);

      // Store the returned JSON in state
      setSelectedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="carousel-menu">

      {/* Main menu */}
      <div className="carousel-menu__main">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={
              activeMenu === item.id
                ? "carousel-menu__item active"
                : "carousel-menu__item"
            }
            onClick={() => handleMenuClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Horizontal submenu */}
      {activeItem && (
        <div>
          {loading && <div>Loading...</div>}

          {error && <div>Error: {error}</div>}

          {!loading && !error && (
            <CarouselSubmenu
              items={items}
              onSelect={handleSubmenuSelect}
            />
          )}
        </div>
      )}
      {selectedData && (
        <>
          <DynamicTable caption={"Summary"} data={
            {
              "columns": selectedData.summary_columns,
              "rows": selectedData.summary
            }
          } />
          <DynamicTable caption={"Failures"} data={
            {
              "columns": selectedData.failures_columns,
              "rows": selectedData.failures
            }
          } />
          <DynamicTable caption={"Test Results"} data={
            {
              "columns": selectedData.results_columns,
              "rows": selectedData.results
            }
          } />
        </>
      )}
    </div>
  );
}

