import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/client";
function Game({ gameDoc, selectedCategoryName }) {
   const [questions, loading, error] = useCollectionDataOnce(
      query(
         collection(db, "questions"),
         where("category", "==", selectedCategoryName)
      )
   );
   console.log("questions", questions);

   return (
      <div>
         <h1>game</h1>
         <div></div>
      </div>
   );
}

export default Game;
