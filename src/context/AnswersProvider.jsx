import React, { useState, useEffect, createContext } from "react";

import { db, answersRef } from "../firebase/client";
import { onSnapshot, collection } from "firebase/firestore";

export const AnswersContext = createContext();
const AnswersProvider = ({ children }) => {
   const [answersData, setAnswersData] = useState([]);

   useEffect(() => {
      // let query = collection(db, "answers");

      const unsub = onSnapshot(answersRef, (snapshot) => {
         let results = [];
         snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
         });
         setAnswersData(results);
      });

      return () => unsub();
   }, []);

   return (
      <AnswersContext.Provider value={answersData}>
         {children}
      </AnswersContext.Provider>
   );
};

export default AnswersProvider;
