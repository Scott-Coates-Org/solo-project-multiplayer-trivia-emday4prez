import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/client";
function GamePage() {
   const { gameDocId } = useParams();
   const [value, loading, error] = useDocument(doc(db, "games", gameDocId));
   return (
      <div>
         <h1>trivia game</h1>
         <h2>game doc id: {gameDocId}</h2>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <span>Document: Loading...</span>}
         {value && (
            <div>
               <h3>game data</h3>
               <pre>{JSON.stringify(value.data(), null, 2)}</pre>
            </div>
         )}
      </div>
   );
}

export default GamePage;

export function GamePageLoader() {}
