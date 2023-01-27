import styles from "./create.module.css";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/client";
import { useCollection } from "../../hooks/useCollection";

export default function Lobby({ username, lobbyOptions = {} }) {
   const { documents: categories } = useCollection("categories");
   console.log("render lobby");
   return (
      <div className={styles.lobby}>
         <h1>start game</h1>
         <p>choose a game category</p>
         <div className={styles.categorySelect}>
            {categories &&
               categories
                  .filter((category) => category.questionCount > 0)
                  .map((category) => (
                     <button
                        key={category.id}
                        onClick={() => lobbyOptions.setCategoryId(category.id)}
                     >
                        {category.categoryName}
                     </button>
                  ))}
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
