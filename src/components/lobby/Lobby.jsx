import { useRef } from "react";
import styles from "../../components/create/create.module.css";
import {
   updateDoc,
   doc,
   getDocs,
   collection,
   query,
   where,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import { useLoaderData, useParams, useLocation } from "react-router-dom";

export default function Lobby({ lobbyOptions }) {
   const { data: categories, gameDocId } = useLoaderData();
   console.log("render lobby -- game docID", gameDocId);
   const { roomCode } = useParams();
   let { state } = useLocation();
   const selectRef = useRef();

   const onCategoryChange = async () => {
      const gameRef = doc(db, "games", gameDocId);
      await updateDoc(gameRef, {
         category: selectRef.current.value,
      });
   };

   return (
      <div className={styles.lobby}>
         <h1>start game</h1>
         <p>choose a game category</p>
         <div key="cat" className={styles.categorySelect}>
            <select
               name="category"
               disabled={!state.host}
               ref={selectRef}
               onChange={onCategoryChange}
            >
               {categories &&
                  categories
                     .filter((category) => category.questionCount > 0)
                     .map((category) => (
                        <option key={category.id} value={category.id}>
                           {category.categoryName}
                        </option>
                     ))}
            </select>
         </div>
         <div>
            <h3>list of users</h3>
            <div className={styles.userList}>display list of users</div>
         </div>
         <div>
            <h2>room code</h2>
            <div className={styles.roomCode}>{roomCode}</div>
         </div>
         <div className={styles.startButton}>
            <button disabled={!state.host}>start game</button>
         </div>
      </div>
   );
}

export const lobbyLoader = async ({ params }) => {
   const { roomCode } = params;
   const categoryRef = collection(db, "categories");
   const categorySnapshot = await getDocs(categoryRef);
   const data = [];
   categorySnapshot.docs.forEach((doc) => {
      data.push(doc.data());
   });
   const gamesRef = collection(db, "games");
   const q = query(gamesRef, where("roomCode", "==", roomCode));
   const gamesSnapshot = await getDocs(q);
   const gameDocId = gamesSnapshot.docs[0].id;
   const users = gamesSnapshot.docs[0].data().usernames;
   return { data, gameDocId, users };
};
