import Modal from "react-modal";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

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
}) {
   console.log("rendered answers", answers);
   const [modalIsOpen, setIsOpen] = useState(false);

   // const fetchPost = async () => {
   //    await getDocs(collection(db, "answers")).then((querySnapshot) => {
   //       const newData = querySnapshot.docs.map((doc) => ({
   //          ...doc.data(),
   //          id: doc.id,
   //       }));
   //       setAnswersData(newData);
   //    });
   // };

   // useEffect(() => {
   //    fetchPost();
   // }, [answers]);

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
   Modal.setAppElement(document.getElementById("root"));
   return (
      <div>
         <h1> movie answers</h1>
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
                              {answer.correct ? (
                                 <input type="radio" checked readOnly />
                              ) : (
                                 <input type="radio" readOnly />
                              )}
                           </td>
                           <td>
                              <button>correct</button>
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
