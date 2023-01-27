import { useState, useRef } from "react";
import Modal from "react-modal";
import {
   collection,
   getDocs,
   doc,
   deleteDoc,
   query,
   where,
   addDoc,
   updateDoc,
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

function QuestionsTable({
   questions,
   selectedCategoryId,
   selectedQuestionId,
   setSelectedQuestionId,
}) {
   console.log("render questions table", questions);
   const [modalIsOpen, setIsOpen] = useState(false);
   const [questionDocId, setQuestionDocId] = useState("");
   const [questionToAdd, setQuestionToAdd] = useState("");
   const inputRef = useRef();

   function openModal(question) {
      setIsOpen(true);
      setSelectedQuestionId(question.id);
      setQuestionDocId(question.id);
   }

   function closeModal() {
      setIsOpen(false);
   }

   async function onDelete(e) {
      e.preventDefault();

      const q = query(
         collection(db, "answers"),
         where("questionId", "==", selectedQuestionId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
         // doc.data() is never undefined for query doc snapshots
         await deleteDoc(doc(db, "answers", doc.id));
      });

      await deleteDoc(doc(db, "questions", questionDocId));
      closeModal();
   }

   async function addQuestion() {
      if (!selectedCategoryId) {
         alert("please select a category first");
         return;
      }
      if (inputRef.current.value.length < 11) {
         alert("Questions must be at least 10 characters long");
         return;
      }

      await addDoc(collection(db, "questions"), {
         questionContent: inputRef.current.value,
         categoryId: selectedCategoryId,
         questionId: `quest_${Math.floor(Math.random() * 10000000).toString()}`,
      });

      inputRef.current.value = "";
   }

   Modal.setAppElement(document.getElementById("root"));

   return (
      <div>
         <h1> questions</h1>
         <table>
            <thead>
               <tr>
                  <th>question</th>

                  <th></th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {questions &&
                  questions
                     .filter((q) => q.categoryId === selectedCategoryId)
                     .map((question) => (
                        <tr key={question.questionId}>
                           <td>{question.questionContent}</td>
                           <td>
                              <button
                                 onClick={() =>
                                    setSelectedQuestionId(question.questionId)
                                 }
                              >
                                 select
                              </button>{" "}
                           </td>
                           <td>
                              <button onClick={() => openModal(question)}>
                                 delete
                              </button>
                           </td>
                        </tr>
                     ))}
               <tr>
                  <td>
                     <input type="text" ref={inputRef}></input>
                  </td>
                  <td>
                     <button onClick={addQuestion}>add</button>
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
            <h2>delete question</h2>
            <div>are you sure you want to delete that question</div>
            <form>
               <button onClick={closeModal}>cancel</button>
               <button onClick={onDelete}>delete</button>
            </form>
         </Modal>
      </div>
   );
}

export default QuestionsTable;
