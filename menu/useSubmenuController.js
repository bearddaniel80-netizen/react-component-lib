import { useState } from "react";
import { buildSubmenuEndpoint } from "./submenuEndpointBuilder";

async function myList(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

export default function useSubmenuController({
  activeMenu,
  mode = "default",
}) {
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function select(item) {
    const endpoint = buildSubmenuEndpoint({
      activeMenu,
      item,
      mode,
    });

    setLoading(true);
    setError(null);

    try {
      const data = await myList(endpoint);

      setSelectedData(data);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    selectedData,
    loading,
    error,
    select,
  };
}
