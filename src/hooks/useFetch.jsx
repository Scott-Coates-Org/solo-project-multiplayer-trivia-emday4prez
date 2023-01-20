import { useState, useEffect } from "react";

export const useFetch = (endpoint, method = "GET") => {
   const [data, setData] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   const [options, setOptions] = useState(null);

   const postData = (postData) => {
      setOptions({
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(postData),
      });
   };

   useEffect(() => {
      let abortController = new AbortController();
      const fetchData = async (fetchOptions) => {
         setIsLoading(true);
         try {
            const response = await fetch(endpoint, {
               ...fetchOptions,
               signal: abortController.signal,
            });
            if (!response.ok)
               throw new Error("fetch failed", response.statusText);
            const newData = await response.json();

            setIsLoading(false);
            setData(newData);
            setError(null);
            console.log("fetched data", newData);
         } catch (error) {
            if (error.name === "AbortError") {
               console.log("fetch aborted");
               setError(error);
               setIsLoading(false);
            } else {
               console.log("fetch failed", error);
               setError("could not fetch..", error);
               setIsLoading(false);
            }
         }
      };
      if (method === "GET") {
         fetchData();
      }
      if (method === "POST") {
         fetchData(options);
      }
      return () => {
         abortController.abort();
      };
   }, [endpoint, options, method]);

   return { data, isLoading, error, postData };
};
