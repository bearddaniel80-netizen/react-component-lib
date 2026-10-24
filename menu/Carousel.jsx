import { useState } from "react";
import { itemsModel } from "./menuModel";
import CarouselSubmenu from "./CarouselSubmenu";
import useSubmenuController from "./useSubmenuController";
import DataRenderer from "./DataRenderer";
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
  component: Renderer,
  model = {},
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

      {submenuLoading && <div>Loading...</div>}

      {submenuError && (
        <div>Error: {submenuError}</div>
      )}

      {selectedData && Renderer && (
        <DataRenderer
          component={Renderer}
          model={model}
          data={selectedData}
        />
      )}
    </div>
  );
}