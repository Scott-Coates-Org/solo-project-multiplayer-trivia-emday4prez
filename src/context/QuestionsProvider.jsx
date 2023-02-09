import React, { useState, useEffect, createContext } from "react";

import { db } from "../firebase/client";
import { onSnapshot, collection } from "firebase/firestore";

export const QuestionsContext = createContext();
const QuestionsProvider = ({ children }) => {
   const [questionsData, setQuestionsData] = useState([]);

   useEffect(() => {
      let query = collection(db, "questions");

      const unsub = onSnapshot(query, (snapshot) => {
         let results = [];
         snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
         });
         setQuestionsData(results);
      });

      return () => unsub();
   }, []);

   return (
      <QuestionsContext.Provider value={questionsData}>
         {children}
      </QuestionsContext.Provider>
   );
};

export default QuestionsProvider;
