import {useRef} from "react"
import "./Carousel.css"

export default function CarouselSubmenu({ items, onSelect }) {
  const containerRef = useRef(null);

  function scrollLeft() {
    containerRef.current?.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    containerRef.current?.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  }

  return (
    <div className="carousel-submenu">

      <button
        className="carousel-submenu__arrow"
        onClick={scrollLeft}
      >
        ‹
      </button>

      <div
        ref={containerRef}
        className="carousel-submenu__items"
      >
        {items.map((item, index) => (
          <button
            key={item.id ?? item.name ?? item ?? index}
            className="carousel-submenu__item"
            onClick={() => onSelect(item)}
          >
            {typeof item === "object"
              ? item.name
              : item}
          </button>
        ))}
      </div>

      <button
        className="carousel-submenu__arrow"
        onClick={scrollRight}
      >
        ›
      </button>

    </div>
  );
}