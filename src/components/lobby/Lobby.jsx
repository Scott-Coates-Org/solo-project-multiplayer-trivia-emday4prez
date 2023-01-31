import { useRef } from "react";
import styles from "../../components/create/create.module.css";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/client";
import { useLoaderData, useParams } from "react-router-dom";

export default function Lobby({ lobbyOptions, gameDocId }) {
   console.log("render lobby", gameDocId);
   const { roomCode } = useParams();
   const selectRef = useRef();
   const { data: categories } = useLoaderData();
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
         <div className={styles.categorySelect}>
            <select name="category" ref={selectRef} onChange={onCategoryChange}>
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
            <button>start game</button>
         </div>
      </div>
   );
}

export const lobbyLoader = async ({ params }) => {
   const categoryRef = collection(db, "categories");
   const categorySnapshot = await getDocs(categoryRef);
   const data = [];
   categorySnapshot.docs.forEach((doc) => {
      data.push(doc.data());
   });

   return { data };
};
