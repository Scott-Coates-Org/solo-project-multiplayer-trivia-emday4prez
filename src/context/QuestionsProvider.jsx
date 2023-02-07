import React, { useState, useEffect, createContext } from "react";

import { db } from "../firebase/client";
import "firebase/firestore";

export const QuestionsContext = createContext();
const QuestionsProvider = ({ children }) => {
   const [questionsData, setQuestionsData] = useState([]);

   useEffect(() => {
      db.collection("categories").onSnapshot((snapshot) => {
         const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setQuestionsData(data);
      });
   }, []);

   return (
      <QuestionsContext.Provider value={questionsData}>
         {children}
      </QuestionsContext.Provider>
   );
};

export default QuestionsProvider;
