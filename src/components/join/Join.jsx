import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
   getDocs,
   collection,
   where,
   query,
   updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import { useState } from "react";

function Join({ username, setUsername }) {
   const navigate = useNavigate();
   const [roomCode, setRoomCode] = useState("");
   const handleClick = async () => {
      if (roomCode.length !== 4) {
         alert("room code must be 4 characters long");
         return;
      }
      const gamesCollection = collection(db, "games");
      const q = query(gamesCollection, where("roomCode", "==", roomCode));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
         alert("room code does not exist");
         return;
      }

      const roomRef = querySnapshot.docs[0].ref;
      await updateDoc(roomRef, {
         usernames: [...querySnapshot.docs[0].data().usernames, username],
      });
      navigate(`/lobby/${roomCode}`, { state: { host: false } });
   };
   return (
      <div>
         <h1>enter room code here</h1>
         <p>enter the room code given to you by the game creator (host)</p>
         <h3>room code</h3>
         <input type="text" onBlur={(e) => setRoomCode(e.target.value)} />

         <button onClick={handleClick}>continue</button>
      </div>
   );
}

export default Join;
