import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/client";
import { useState } from "react";
function Join({ username }) {
   const roomCodeRef = useRef();
   const [roomCode, setRoomCode] = useState("");
   const handleClick = async () => {
      const roomCode = roomCodeRef.current.value;

      if (roomCode.length !== 4) {
         alert("room code must be 4 characters long");
         return;
      }
      const gamesCollection = collection(db, "games");
      const query = gamesCollection.where("roomCode", "==", roomCode);
      const querySnapshot = await getDocs(query);
      if (querySnapshot.empty) {
         alert("room code does not exist");
         return;
      }
      querySnapshot.docs[0].ref.update({
         usernames: [...querySnapshot.docs[0].data().usernames, username],
      });
   };
   return (
      <div>
         <h1>enter room code here</h1>
         <p>enter the room code given to you by the game creator (host)</p>
         <h3>room code</h3>
         <input type="text" onBlur={(e) => setRoomCode(e.target.value)} />
         <Link to={`/create/lobby/${roomCode}`} state={{ host: false }}>
            <button onClick={handleClick}>continue</button>
         </Link>
      </div>
   );
}

export default Join;
