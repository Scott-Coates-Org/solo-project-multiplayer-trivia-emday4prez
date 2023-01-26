import React from "react";
import Username from "./Username";
import styles from "./create.module.css";
function CreatePage() {
   return (
      <div className={styles.createPage}>
         <h2>create a new game</h2>

         <Username />
      </div>
   );
}

export default CreatePage;
