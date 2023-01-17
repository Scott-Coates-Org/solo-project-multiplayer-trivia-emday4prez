import Modal from "react-modal";
import { useState } from "react";
import answersData from "../../data/answers";

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
   const [modalIsOpen, setIsOpen] = useState(false);
   const [answers, setAnswers] = useState(answersData);
   const [selectedAnswer, setSelectedAnswer] = useState(null);

   function openModal(answer) {
      setIsOpen(true);
      setSelectedAnswer(answer.answerId);
   }

   function closeModal() {
      setIsOpen(false);
   }

   function onDelete() {
      const newAnswers = answers.filter(
         (answer) => answer.answerId !== selectedAnswer
      );
      setAnswers(newAnswers);
      closeModal();
   }

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
               {answers
                  .filter((answer) => answer.questionId === selectedQuestion)
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
            <form>
               <button onClick={closeModal}>cancel</button>
               <button onClick={onDelete}>delete</button>
            </form>
         </Modal>
      </div>
   );
}

export default AnswersTable;
