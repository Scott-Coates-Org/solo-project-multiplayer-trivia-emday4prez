import { useState } from "react";

function Game({ gameDoc }) {
   return (
      <div>
         <h1>game</h1>
         <h2>category: {gameDoc.data().category}</h2>
      </div>
   );
}

export default Game;
