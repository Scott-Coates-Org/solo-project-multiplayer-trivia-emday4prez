import React from "react";
import Username from "./Username";
import Lobby from "./Lobby";
import styles from "./create.module.css";
import { useCollection } from "../../hooks/useCollection";

function CreatePage() {
   const [username, setUsername] = React.useState("");
   const { documents: categories } = useCollection("categories");
   return (
      <div className={styles.createPage}>
         <h2>create a new game</h2>

         {!username ? (
            <Username
               username={username}
               setUsername={setUsername}
               categories={categories}
            />
         ) : (
            <Lobby
               username={username}
               setUsername={setUsername}
               categories={categories}
            />
         )}
      </div>
   );
}

export default CreatePage;
