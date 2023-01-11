import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
  .join(', ');
if(keysWithEmptyValues) throw new Error(`These keys must be filled in ROOT_DIR/env.local before starting the app: ${keysWithEmptyValues}`);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
