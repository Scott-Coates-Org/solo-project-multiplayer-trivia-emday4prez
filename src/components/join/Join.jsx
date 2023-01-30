import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
   const navigate = useNavigate();
   const roomCodeRef = useRef();

   const handleClick = () => {
      const roomCode = roomCodeRef.current.value;
      if (roomCode.length < 4) {
         alert("room code must be at least 4 characters long");
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
