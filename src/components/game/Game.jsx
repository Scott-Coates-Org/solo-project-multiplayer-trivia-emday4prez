import { useState } from "react";

function Game({ gameDoc, questions }) {
   const [questionIndex, setQuestionIndex] = useState(0);
   // async function getQuestions() {
   //    const questionsRef = collection(db, "questions");
   //    const questionsQuery = query(
   //       questionsRef,
   //       where("category", "==", gameDoc.data().category)
   //    );
   //    const querySnapshot = await getDocs(questionsQuery);
   //    const questions = querySnapshot.docs.map((doc) => doc.data());
   //    return questions;
   // }

   return (
      <div>
         <h1>game</h1>
         <h2>category: {gameDoc.data().category}</h2>
         <h2>question: {questions}</h2>
      </div>
   );
}

export default Game;
