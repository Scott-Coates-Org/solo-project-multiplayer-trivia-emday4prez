import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, collection } from "firebase/firestore";

const firebaseKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const firebaseConfig = {
   apiKey: firebaseKey,
   projectId: firebaseProjectId,
};

// validate config
const keysWithEmptyValues = Object.entries(firebaseConfig)
   .filter(([k, v]) => !v)
   .map(([k]) => k)
   .join(", ");
if (keysWithEmptyValues)
   throw new Error(
      `These keys must be filled in ROOT_DIR/env.local before starting the app: ${keysWithEmptyValues}`
   );

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const findAndDelete = async (collection, id) => {
   const docRef = doc(db, collection, id);
   await deleteDoc(docRef);
};

export const categoriesRef = collection(db, "categories");
export const questionsRef = collection(db, "questions");
export const answersRef = collection(db, "answers");
export const gamesRef = collection(db, "games");
