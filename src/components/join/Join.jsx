import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/client";
function Join() {
   const navigate = useNavigate();
   const roomCodeRef = useRef();

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

      navigate("/lobby");
   };
   return (
      <div>
         <h1>enter room code here</h1>
         <p>enter the room code given to you by the game creator (host)</p>
         <h3>room code</h3>
         <input type="text" ref={roomCodeRef} />
         <button onClick={handleClick}>continue</button>
      </div>
   );
}

export default Join;
