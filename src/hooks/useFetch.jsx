import { useState, useEffect } from "react";

export const useFetchWithAbort = (endpoint) => {
   const [fetchedData, setFetchedData] = useState();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      let abortController = new AbortController();
      const fetchData = async () => {
         try {
            const response = await fetch(endpoint, {
               signal: abortController.signal,
            });
            const newData = await response.json();
            setIsLoading(false);
            setFetchedData(newData);
            console.log("fetched data", newData);
         } catch (error) {
            if (error.name === "AbortError") {
               setError(error);
               setIsLoading(false);
            }
         }
      };
      fetchData();
      return () => {
         abortController.abort();
      };
   }, [endpoint]);

   return { fetchedData, isLoading, error };
};
