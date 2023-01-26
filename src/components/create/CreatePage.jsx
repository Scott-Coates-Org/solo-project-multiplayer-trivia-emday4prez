import React from "react";
import Username from "./Username";
import Lobby from "./Lobby";
import styles from "./create.module.css";
function CreatePage() {
   return (
      <div className={styles.createPage}>
         <h2>create a new game</h2>

         <Username />
         <Lobby />
      </div>
   );
}

export default CreatePage;
