import React, { useState } from "react";
import Username from "./Username";
import Join from "./Join";
import styles from "./join.module.css";

export default function JoinPage({ categories }) {
   const [username, setUsername] = useState("");
   return (
      <div className={styles.joinPage}>
         <h2>join a game</h2>
         <Username username={username} setUsername={setUsername} />
         <Join username={username} setUsername={setUsername} />
      </div>
   );
}
