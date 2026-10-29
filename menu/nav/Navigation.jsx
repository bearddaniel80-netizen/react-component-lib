
import { useEffect, useState } from "react";
import { navigationConfig } from "./navigation.config";
import "./Navigation.css";

function normalizePath(path) {
  return path.replace(/\/+$/, "") || "/";
}

function isRouteActive(href, pathname) {
  if (!href) return false;

  const target = normalizePath(href);
  const current = normalizePath(pathname);

  return target === "/"
    ? current === "/"
    : current === target || current.startsWith(target + "/");
}

function containsActiveRoute(item, pathname) {
  return (
    isRouteActive(item.href, pathname) ||
    (item.children || []).some((child) =>
      containsActiveRoute(child, pathname)
    )
  );
}

function NavigationItem({
  item,
  pathname,
  openPath,
  setOpenPath,
  path = [],
}) {
  if (item.visible === false) return null;

  const itemPath = [...path, item.id];
  const key = itemPath.join("/");
  const children = (item.children || []).filter(
    (child) => child.visible !== false
  );
  const hasChildren = children.length > 0;
  const active = isRouteActive(item.href, pathname);
  const descendantActive = children.some((child) =>
    containsActiveRoute(child, pathname)
  );

  // Keep the active route's ancestor menus open.
  const expanded =
    openPath === key; /*
    ||
    (openPath && openPath.startsWith(key + "/")) ||
    descendantActive;
*/
  function toggleMenu() {
    setOpenPath((current) => (current === key ? null : key));
  }

  return (
    <li className="nav-item">
      <div className="nav-row">
        {item.href ? (
          <a
            className={`nav-link${active ? " active" : ""}`}
            href={item.href}
            aria-current={active ? "page" : undefined}
            aria-disabled={item.disabled || undefined}
            onClick={(event) => {
              if (item.disabled) {
                event.preventDefault();
                return;
              }
              setOpenPath(null);
            }}
          >
            {item.label}
          </a>
        ) : (
          <span className="nav-label">{item.label}</span>
        )}

        {hasChildren && (
          <button
            type="button"
            className="nav-toggle"
            aria-label={`${expanded ? "Close" : "Open"} ${item.label}`}
            aria-expanded={Boolean(expanded)}
            onClick={toggleMenu}
          >
            {expanded ? "−" : "+"}
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <ul className="nav-children">
          {children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              pathname={pathname}
              openPath={openPath}
              setOpenPath={setOpenPath}
              path={itemPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Navigation({
  model = navigationConfig,
  pathname: pathnameProp,
}) {
  const [browserPath, setBrowserPath] = useState(
    () => window.location.pathname
  );
  const [openPath, setOpenPath] = useState(null);

  useEffect(() => {
    const updatePath = () => {
      setBrowserPath(window.location.pathname);
      setOpenPath(null);
    };

    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  // Close menus when clicking outside the navigation.
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest(".app-navigation")) {
        setOpenPath(null);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () =>
      document.removeEventListener("click", handleOutsideClick);
  }, []);

  const pathname = pathnameProp ?? browserPath;

  return (
    <nav
      className="app-navigation"
      aria-label={model.label || "Main navigation"}
    >
      <ul className="nav-root">
        {model.items
          .filter((item) => item.visible !== false)
          .map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              pathname={pathname}
              openPath={openPath}
              setOpenPath={setOpenPath}
            />
          ))}
      </ul>
    </nav>
  );
}
