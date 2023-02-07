import React, { useState, useEffect, createContext } from "react";

import { db } from "../firebase/client";
import "firebase/firestore";

export const CategoriesContext = createContext();
const CategoriesProvider = ({ children }) => {
   const [categoryData, setCategoryData] = useState([]);

   useEffect(() => {
      db.collection("categories").onSnapshot((snapshot) => {
         const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setCategoryData(data);
      });
   }, []);

   return (
      <CategoriesContext.Provider value={categoryData}>
         {children}
      </CategoriesContext.Provider>
   );
};

export default CategoriesProvider;
