import React, { useState, useEffect, createContext } from "react";

import { db } from "../firebase/client";
import "firebase/firestore";

export const AnswersContext = createContext();
const CategoriesProvider = ({ children }) => {
   const [answersData, setAnswersData] = useState([]);

   useEffect(() => {
      db.collection("categories").onSnapshot((snapshot) => {
         const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setAnswersData(data);
      });
   }, []);

   return (
      <AnswersContext.Provider value={answersData}>
         {children}
      </AnswersContext.Provider>
   );
};

export default CategoriesProvider;
