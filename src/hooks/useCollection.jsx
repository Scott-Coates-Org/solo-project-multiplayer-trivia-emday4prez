import { useState, useEffect } from "react";
import { db } from "../firebase/client";

//imports from firestore
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (c) => {
   const [documents, setDocuments] = useState(null);

   useEffect(() => {
      let query = collection(db, c);

      const unsub = onSnapshot(query, (snapshot) => {
         let results = [];
         snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
         });
         setDocuments(results);
      });

      return () => unsub();
   }, [c]);

   return { documents };
};
