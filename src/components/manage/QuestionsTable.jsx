import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
   collection,
   getDocs,
   doc,
   deleteDoc,
   query,
   where,
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

function QuestionsTable({ selectedQuestionId, setSelectedQuestionId }) {
   const [modalIsOpen, setIsOpen] = useState(false);
   const [questions, setQuestions] = useState([]);

   const questionsRef = collection(db, "questions");
   const answersRef = collection(db, "answers");

   const fetchPost = async () => {
      await getDocs(questionsRef).then((querySnapshot) => {
         const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
         setQuestions(newData);
      });
   };

   useEffect(() => {
      fetchPost();
   }, []);

   function openModal(question) {
      setIsOpen(true);
      setSelectedQuestionId(question.id);
   }

   function closeModal() {
      setIsOpen(false);
   }

   async function onDelete(e) {
      e.preventDefault();

      const reference = doc(db, "questions", selectedQuestionId);
      // await deleteDoc(reference);
      const q = query(
         answersRef,
         where("questionId", "==", `quest_${selectedQuestionId}`)
      );
      await getDocs(q).then((querySnapshot) => {
         querySnapshot.docs.forEach((doc) => {
            deleteDoc(doc.ref);
         });
      });

      closeModal();
   }
   Modal.setAppElement(document.getElementById("root"));

   const handleClick = (question) => {
      console.log("questionId: ", question.questionId);
      // setSelectedQuestion(question.questionId);
   };

   return (
      <div>
         <h1>movie questions</h1>
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
                  questions.map((question) => (
                     <tr key={question.questionId}>
                        <td>{question.questionContent}</td>
                        <td>
                           <button onClick={() => handleClick(question)}>
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
