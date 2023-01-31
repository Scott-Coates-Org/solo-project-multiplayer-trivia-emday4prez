import { useRef, useState, useEffect } from "react";
import { useLoaderData, useParams, useLocation } from "react-router-dom";
import {
   updateDoc,
   doc,
   getDocs,
   collection,
   query,
   where,
   onSnapshot,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/client";
import styles from "../../components/create/create.module.css";

export default function Lobby({ lobbyOptions }) {
   const [gameDocData, setGameDocData] = useState([]);
   const [selectedCategoryName, setSelectedCategoryName] = useState("");
   const { data: categories, gameDocId, users } = useLoaderData();
   console.log("render lobby -- game docID", gameDocId);
   const { roomCode } = useParams();
   let { state } = useLocation();
   const selectRef = useRef();
   const [gameDoc, loading, error] = useDocument(doc(db, "games", gameDocId));
   // useEffect(() => {
   //    const unsubscribe = onSnapshot(
   //       query(collection(db, "games"), where("roomCode", "==", roomCode)),
   //       (querySnapshot) => {
   //          const data = querySnapshot.docs.map((doc) => doc.data());
   //          console.log("current data: ", data);
   //          setGameDocData(data);
   //       },
   //       (error) => console.log("error", error)
   //    );
   //    return () => unsubscribe();
   // }, [roomCode]);

   const onCategoryChange = async (e) => {
      setSelectedCategoryName(selectRef.current.value);
      const gameRef = doc(db, "games", gameDocId);
      await updateDoc(gameRef, {
         category: selectRef.current.value,
      });
   };

   return (
      <div className={styles.lobby}>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <span>Document: Loading...</span>}
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
            {gameDoc && (
               <h3>{`selected category: ${gameDoc.data().category}`}</h3>
            )}
         </div>
         <div>
            <h3>list of users</h3>
            <div className={styles.userList}>
               {users &&
                  users.map((user) => {
                     return (
                        <div key={user} className={styles.user}>
                           {user}
                        </div>
                     );
                  })}
            </div>
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
