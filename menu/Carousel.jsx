import { useState } from "react";
import { itemsModel } from "./menuModel";
import CarouselSubmenu from "./CarouselSubmenu";
import DynamicTable from "../dynamic-table/DynamicTable";
import useSubmenuController from "./useSubmenuController";
import "./Carousel.css";

async function myList(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

export default function CarouselMenu({
  menuItems = itemsModel,
  mode = "default",
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    selectedData,
    loading: submenuLoading,
    error: submenuError,
    select,
  } = useSubmenuController({
    activeMenu,
    mode,
  });

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
              onSelect={select}
            />
          )}
        </div>
      )}

      {/* Submenu request */}
      {submenuLoading && <div>Loading...</div>}

      {submenuError && (
        <div>Error: {submenuError}</div>
      )}

      {/* Results */}
      {selectedData && (
        <>
          <DynamicTable
            caption="Summary"
            data={{
              columns: selectedData.summary_columns,
              rows: selectedData.summary,
            }}
          />

          {selectedData.query_performance_columns && (
            <DynamicTable
              caption="Slowest Query"
              data={{
                columns: selectedData.query_performance_columns,
                rows: selectedData.query_performance,
              }}
            />
          )}

          {selectedData.failures_columns && (
            <DynamicTable
              caption="Failures"
              data={{
                columns: selectedData.failures_columns,
                rows: selectedData.failures,
              }}
            />
          )}

          <DynamicTable
            caption="Test Results"
            data={{
              columns: selectedData.results_columns,
              rows: selectedData.results,
            }}
          />
        </>
      )}
    </div>
  );
}
