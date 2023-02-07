import React, { useState, useEffect, createContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/client";
import "firebase/firestore";

export const CategoriesContext = createContext();
const CategoriesProvider = ({ children }) => {
   const [categoryData, setCategoryData] = useState([]);

   useEffect(() => {
      let query = collection(db, "categories");

      const unsub = onSnapshot(query, (snapshot) => {
         let results = [];
         snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
         });
         setCategoryData(results);
      });

      return () => unsub();
   }, []);

   return (
      <CategoriesContext.Provider value={categoryData}>
         {children}
      </CategoriesContext.Provider>
   );
};

export default CategoriesProvider;
