import React from "react";
import Username from "./Username";
import Lobby from "./Lobby";
import styles from "./create.module.css";
function CreatePage() {
   const [username, setUsername] = React.useState("");
   return (
      <div className={styles.createPage}>
         <h2>create a new game</h2>

         {!username ? (
            <Username username={username} setUsername={setUsername} />
         ) : (
            <Lobby username={username} setUsername={setUsername} />
         )}
      </div>
   );
}

export default CreatePage;
