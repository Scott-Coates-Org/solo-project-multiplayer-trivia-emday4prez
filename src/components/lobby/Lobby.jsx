import { useRef, useState } from "react";
import { useLoaderData, useParams, useLocation } from "react-router-dom";
import {
   updateDoc,
   doc,
   getDocs,
   collection,
   query,
   where,
   limit,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import ProgressBar from "../ProgressBar";
import { db } from "../../firebase/client";
import Game from "../game/Game";
import styles from "../../components/create/create.module.css";
import { categoriesRef, questionsRef, answersRef } from "../../firebase/client";

export default function Lobby({ lobbyOptions }) {
   const { data: categories, gameDocId } = useLoaderData();
   const [gameDoc, loading, error] = useDocument(doc(db, "games", gameDocId));
   console.log("render lobby -- game docID", gameDocId);

   const [categoryID, setCategoryID] = useState("");
   const { roomCode } = useParams();
   let { state } = useLocation();
   const selectRef = useRef();

   const [questions, setQuestions] = useState([]);

   const onCategoryChange = async () => {
      const gameRef = doc(db, "games", gameDocId);
      await updateDoc(gameRef, {
         category: selectRef.current.value,
      });
      console.log("category changed", selectRef.current.value);
   };

   const onStartGame = async () => {
      const gameRef = doc(db, "games", gameDocId);
      await updateDoc(gameRef, {
         loadProgress: 10,
      });
      await updateDoc(gameRef, {
         started: false,
         loadProgress: 0,
         dateStarted: new Date().toLocaleDateString(),
         loading: true,
         currentQuestion: 0,
      });
      await updateDoc(gameRef, {
         loadProgress: 30,
      });

      const cat_q = query(
         categoriesRef,
         where("categoryName", "==", selectRef.current.value)
      );

      const querySnapshot = await getDocs(cat_q);
      setCategoryID(querySnapshot.docs[0].data().categoryId);

      await updateDoc(gameRef, {
         loadProgress: 60,
      });

      const questions_q = query(
         questionsRef,
         where(
            "categoryId",
            "==",
            querySnapshot.docs[0].data().categoryId,
            limit(5)
         )
      );

      const quests = [];
      const questionsSnapshot = await getDocs(questions_q);
      await updateDoc(gameRef, {
         loadProgress: 80,
      });
      questionsSnapshot.forEach(async (doc) => {
         let question = doc.data();
         question.id = doc.id;
         // Get all answers for this question
         const answersQuery = query(
            answersRef,
            where("questionId", "==", question.questionId)
         );
         const answersSnapshot = await getDocs(answersQuery);
         let answers = [];

         // Loop through the answer documents
         answersSnapshot.forEach((answerDoc) => {
            let answer = answerDoc.data();
            answer.id = answerDoc.id;

            // Add the answer to the array
            answers.push(answer);
         });

         // Add the answers to the question
         question.answers = answers;

         // Add the question to the array
         quests.push(question);
         await updateDoc(gameRef, {
            questions: quests,
         });
      });

      await updateDoc(gameRef, {
         loading: false,
         started: true,
         inLobby: false,
         loadProgress: 100,
      });
   };

   return (
      <div className={styles.lobby}>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <span>Document: Loading...</span>}
         {gameDoc?.data().inLobby && (
            <>
               <h1>game lobby</h1>
               {state.host && (
                  <SelectCategory
                     onCategoryChange={onCategoryChange}
                     selectRef={selectRef}
                     categories={categories}
                     categoryId={categoryID}
                  />
               )}
               <div>
                  <h3>list of users</h3>
                  <div className={styles.userList}>
                     {!loading &&
                        gameDoc.data().usernames.map((un) => {
                           return <div key={un}>{un}</div>;
                        })}
                  </div>
               </div>
               <div>
                  <h3>selected category</h3>
                  <div className={styles.selectedCategory}>
                     {gameDoc && gameDoc.data().category}
                  </div>
               </div>
               <div>
                  <h2>room code</h2>
                  <div className={styles.roomCode}>{roomCode}</div>
               </div>
               <div className={styles.startButton}>
                  <button
                     onClick={onStartGame}
                     disabled={
                        !state.host || gameDoc?.data().usernames.length < 2
                     }
                  >
                     start game
                  </button>
               </div>
            </>
         )}
         <div>
            {gameDoc?.data().started && (
               <Game
                  gameDoc={gameDoc}
                  questions={questions}
                  categoryID={categoryID}
               />
            )}
            {gameDoc?.data().loading ? (
               <div>
                  <ProgressBar
                     bgcolor="orange"
                     progress={gameDoc?.data().loadProgress}
                     height={30}
                  />
                  <p>the game will begin soon</p>
               </div>
            ) : null}
         </div>
      </div>
   );
}

function SelectCategory({
   categories,
   selectRef,
   onCategoryChange,
   categoryId,
}) {
   return (
      <div>
         <h3>select category</h3>
         <select ref={selectRef} onChange={onCategoryChange}>
            {/* <option value=" " disabled>
               Choose here
            </option> */}
            {categories &&
               categories.map((category) => {
                  return (
                     <option
                        key={category.categoryId}
                        value={category.categoryName}
                     >
                        {category.categoryName}
                     </option>
                  );
               })}
         </select>
      </div>
   );
}

export const lobbyLoader = async ({ params }) => {
   const { roomCode } = params;

   const categorySnapshot = await getDocs(categoriesRef);
   const data = [];
   categorySnapshot.docs.forEach((doc) => {
      data.push(doc.data());
   });
   const gamesRef = collection(db, "games");
   const q = query(gamesRef, where("roomCode", "==", roomCode));
   const gamesSnapshot = await getDocs(q);
   const gameDocId = gamesSnapshot.docs[0].id;

   return { data, gameDocId };
};
