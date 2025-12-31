import { useState, useEffect } from "react";

function useFetch(url, options = null) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsPending(true);
    setError(null);

    const timer = setTimeout(() => {
      fetch(url, { ...options, signal: controller.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { data, isPending, error };
}

export default useFetch;
