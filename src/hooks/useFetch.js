import { useState, useEffect } from "react";

export const useFetch = (endPoint) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(endPoint)
          .then((response) => response.json())
          .then((data) => data && setResponse(data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { response, error, loading };
};
