import React, { useState } from "react";
import Username from "./Username";
import Join from "./Join";
import styles from "./join.module.css";

export default function JoinPage() {
   const [username, setUsername] = useState("");
   return (
      <div className={styles.joinPage}>
         <h2>join a game</h2>
         {!username && (
            <Username username={username} setUsername={setUsername} />
         )}

         {username && <Join username={username} setUsername={setUsername} />}
      </div>
   );
}
