import { useRef } from "react";
import styles from "../../components/create/create.module.css";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/client";

export default function Lobby({
   username,
   lobbyOptions,
   categories,
   gameDocId,
}) {
   console.log("render lobby");

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
            <div className={styles.userList}>
               <p>{username} (you)</p>
            </div>
         </div>
         <div className={styles.startButton}>
            <button>start game</button>
         </div>
      </div>
   );
}
