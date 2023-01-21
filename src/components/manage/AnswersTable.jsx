import Modal from "react-modal";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useCollection } from "../../hooks/useCollection";
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
function AnswersTable({ selectedQuestion, setSelectedQuestion }) {
   const { documents: answers } = useCollection("answers");

   const [modalIsOpen, setIsOpen] = useState(false);
   const [answersData, setAnswersData] = useState([]);
   const [Id, setId] = useState("");

   const fetchPost = async () => {
      await getDocs(collection(db, "answers")).then((querySnapshot) => {
         const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
         setAnswersData(newData);
      });
   };

   useEffect(() => {
      fetchPost();
   }, [answers]);

   function openModal(id) {
      setIsOpen(true);
      setId(id);
   }

   function closeModal() {
      setIsOpen(false);
   }

   async function onDelete(e) {
      e.preventDefault();
      const reference = doc(db, "answers", Id);
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
               {answersData &&
                  answersData
                     //.filter((answer) => answer.questionId === selectedQuestion)
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
                                 <button onClick={() => openModal(answer.id)}>
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
