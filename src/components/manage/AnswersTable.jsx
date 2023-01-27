import Modal from "react-modal";
import { useState, useRef } from "react";
import {
   collection,
   query,
   getDocs,
   getDoc,
   where,
   updateDoc,
   doc,
   deleteDoc,
   addDoc,
} from "firebase/firestore";

import { db } from "../../firebase/client";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
   },
};

function AnswersTable({
   answers,
   selectedQuestionId,
   selectedAnswerDocId,
   setSelectedAnswerDocId,
   selectedCategoryId,
}) {
   console.log("rendered answers", answers);
   const [modalIsOpen, setIsOpen] = useState(false);
   const inputRef = useRef();
   function openModal(answer) {
      setIsOpen(true);
      setSelectedAnswerDocId(answer.id);
   }

   function closeModal() {
      setIsOpen(false);
   }

   async function onDelete(e) {
      e.preventDefault();
      const reference = doc(db, "answers", selectedAnswerDocId);
      await deleteDoc(reference);

      closeModal();
   }

   async function onMarkCorrect(id) {
      const answersRef = collection(db, "answers");
      const q = query(
         answersRef,
         where("questionId", "==", selectedQuestionId),
         where("correct", "==", true)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach((doc) => {
         updateDoc(doc.ref, {
            correct: false,
         });
      });

      setSelectedAnswerDocId(id);
      const docRef = doc(db, "answers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
         await updateDoc(docRef, {
            correct: true,
         });
      }

      // if (docSnap.data().correct === true) {
      //    await updateDoc(docRef, {
      //       correct: false,
      //    });
      //    return;
      // } else {
      //    await updateDoc(docRef, {
      //       correct: true,
      //    });
      //    return;
      // }
   }
   async function addAnswer() {
      if (!selectedQuestionId) {
         alert("please select a question first");
         return;
      }
      if (inputRef.current.value.length < 2) {
         alert("Answers must be at least 1 characters long");
         return;
      }

      await addDoc(collection(db, "answers"), {
         answerContent: inputRef.current.value,
         questionId: selectedQuestionId,
         answerId: `ans_${Math.floor(Math.random() * 100000).toString()}`,
      });

      const answerQuery = query(
         collection(db, "answers"),
         where("questionId", "==", selectedQuestionId)
      );
      const answerQuerySnapshot = await getDocs(answerQuery);

      const answerCount = answerQuerySnapshot.docs.length;

      let hasCorrectAnswer = false;
      answerQuerySnapshot.docs.forEach((doc) => {
         if (doc.data().correct === true) {
            hasCorrectAnswer = true;
         }
      });
      if (answerCount > 1 && hasCorrectAnswer === true) {
         const categoryRef = collection(db, "categories");
         const categoryQuery = query(
            categoryRef,
            where("categoryId", "==", selectedCategoryId)
         );
         const categoryQuerySnapshot = await getDocs(categoryQuery);
         const categoryDocRef = categoryQuerySnapshot.docs[0].ref;
         await updateDoc(categoryDocRef, {
            questionCount:
               categoryQuerySnapshot.docs[0].data().questionCount + 1,
         });
      }

      inputRef.current.value = "";
   }
   Modal.setAppElement(document.getElementById("root"));
   return (
      <div>
         <h1> answers</h1>
         <p>only questions with 2 or more answers will be used in game.</p>
         <p>each question can have only one correct answer</p>
         <table>
            <thead>
               <tr>
                  <th>answer</th>
                  <th>correct</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {answers &&
                  answers
                     .filter(
                        (answer) => answer.questionId === selectedQuestionId
                     )
                     .map((answer) => (
                        <tr key={answer.answerId}>
                           <td>{answer.answerContent}</td>
                           <td>
                              {answer.correct === true ? (
                                 <input type="radio" checked readOnly />
                              ) : (
                                 <input type="radio" readOnly />
                              )}
                           </td>
                           <td>
                              <button onClick={() => onMarkCorrect(answer.id)}>
                                 correct
                              </button>
                           </td>
                           <td>
                              <div>
                                 <button onClick={() => openModal(answer)}>
                                    delete
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
               <tr>
                  <td>
                     <input type="text" ref={inputRef}></input>
                  </td>
                  <td>
                     <button onClick={addAnswer}>add</button>
                  </td>
               </tr>
            </tbody>
         </table>
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="delete answer"
         >
            <h2>delete answer</h2>
            <div>are you sure you want to delete</div>
            <div>
               <button onClick={closeModal}>cancel</button>
               <button onClick={onDelete}>delete</button>
            </div>
         </Modal>
      </div>
   );
}

export default AnswersTable;
