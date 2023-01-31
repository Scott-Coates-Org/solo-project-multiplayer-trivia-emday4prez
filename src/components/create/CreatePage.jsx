import React from "react";
import Username from "./Username";

import styles from "./create.module.css";
import { Outlet } from "react-router-dom";

function CreatePage({ categories }) {
   const [creatorName, setCreatorName] = React.useState("");
   const [gameDocId, setGameDocId] = React.useState("");
   return (
      <div className={styles.createPage}>
         <h2>create a new game</h2>

         {
            !creatorName && (
               <Username
                  creatorName={creatorName}
                  setCreatorName={setCreatorName}
                  categories={categories}
                  setGameDocId={setGameDocId}
               />
            )

            /* (
            <Lobby
               username={username}
               setUsername={setUsername}
               categories={categories}
               gameDocId={gameDocId}
            />
         ) */
         }
         <Outlet />
      </div>
   );
}

export default CreatePage;
