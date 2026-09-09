import { useEffect, useState } from "react";

function App() {
  const [res, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }

        return response.json();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Message</h1>
        <div>
          {res.message}
        </div>
    </div>
  );
}

export default App;