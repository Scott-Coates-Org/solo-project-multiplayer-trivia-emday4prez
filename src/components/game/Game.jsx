function Game({ gameDoc }) {
   console.log("gameDoc", gameDoc.data());
   return (
      <div>
         <h1>game</h1>
         <h2>category: {gameDoc?.data().category}</h2>
         <h2>question</h2>
         {/* <div>{gameDoc?.data().questions[0].questionContent}</div> */}
         <h2>answers</h2>
         {/* <div>{gameDoc.data().questions[0].answers[0]}</div> */}
      </div>
   );
}

export default Game;
