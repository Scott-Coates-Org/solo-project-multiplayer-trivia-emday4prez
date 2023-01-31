import React from "react";
import Username from "./Username";
import { useCollection } from "../../hooks/useCollection";
import styles from "./create.module.css";
import { Outlet } from "react-router-dom";

function CreatePage() {
   const [creatorName, setCreatorName] = React.useState("");
   const [gameDocId, setGameDocId] = React.useState("");
   const { documents: categories } = useCollection("categories");
   return (
      <div className={styles.createPage}>
         <h2>create a new game</h2>

         {!creatorName && (
            <Username
               creatorName={creatorName}
               setCreatorName={setCreatorName}
               setGameDocId={setGameDocId}
               gameDocId={gameDocId}
               categories={categories}
            />
         )}
         <Outlet />
      </div>
   );
}

export default CreatePage;
