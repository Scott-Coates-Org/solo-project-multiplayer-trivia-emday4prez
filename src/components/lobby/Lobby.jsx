import { useRef, useState } from "react";
import { useLoaderData, useParams, useLocation, Link } from "react-router-dom";
import {
   updateDoc,
   doc,
   getDocs,
   collection,
   query,
   where,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import ProgressBar from "../ProgressBar";
import { db } from "../../firebase/client";
import Game from "../game/Game";
import styles from "../../components/create/create.module.css";

export default function Lobby({ lobbyOptions }) {
   const [selectedCategoryName, setSelectedCategoryName] = useState("");
   const { data: categories, gameDocId } = useLoaderData();
   console.log("render lobby -- game docID", gameDocId);
   const { roomCode } = useParams();
   let { state } = useLocation();
   const selectRef = useRef();
   const [gameDoc, loading, error] = useDocument(doc(db, "games", gameDocId));
   const [progress, setProgress] = useState(0);
   const onCategoryChange = async () => {
      setSelectedCategoryName(selectRef.current.value);
      const gameRef = doc(db, "games", gameDocId);
      await updateDoc(gameRef, {
         category: selectRef.current.value,
      });
   };

   const onStartGame = async () => {
      setProgress(30);
      const gameRef = doc(db, "games", gameDocId);
      setProgress(60);
      await updateDoc(gameRef, {
         started: true,
         inLobby: false,
         dateStarted: new Date().toLocaleDateString(),
         loading: true,
      });
      setProgress(99);
   };

   return (
      <div className={styles.lobby}>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <span>Document: Loading...</span>}
         {!error && !loading && (
            <div>
               <h1>game lobby</h1>
               {state.host && (
                  <SelectCategory
                     onCategoryChange={onCategoryChange}
                     selectRef={selectRef}
                     categories={categories}
                  />
               )}
               <div>
                  <h3>list of users</h3>
                  <div className={styles.userList}>
                     {gameDoc &&
                        gameDoc.data().usernames.map((un) => {
                           return <div key={un}>{un}</div>;
                        })}
                  </div>
               </div>
               <div>
                  <h3>selected category</h3>
                  <div className={styles.selectedCategory}>
                     {gameDoc && gameDoc.data().category}
                  </div>
               </div>
               <div>
                  <h2>room code</h2>
                  <div className={styles.roomCode}>{roomCode}</div>
               </div>
               <div className={styles.startButton}>
                  <button
                     onClick={onStartGame}
                     disabled={
                        !state.host || gameDoc?.data().usernames.length < 2
                     }
                  >
                     start game
                  </button>
               </div>
               {gameDoc?.data().loading ? (
                  <div>
                     <ProgressBar
                        bgcolor="orange"
                        progress={progress}
                        height={30}
                     />
                     <p>the game will begin soon</p>
                  </div>
               ) : null}

               <Game />
            </div>
         )}
      </div>
   );
}

function SelectCategory({ categories, selectRef, onCategoryChange }) {
   return (
      <div>
         <h3>select category</h3>
         <select ref={selectRef} onChange={onCategoryChange}>
            {categories &&
               categories.map((category) => {
                  return (
                     <option
                        key={category.categoryId}
                        value={category.categoryName}
                     >
                        {category.categoryName}
                     </option>
                  );
               })}
         </select>
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
