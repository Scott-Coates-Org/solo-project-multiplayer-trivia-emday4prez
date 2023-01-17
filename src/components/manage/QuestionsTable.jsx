import { useState } from "react";
import Modal from "react-modal";

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
   selectedQuestion,
   setSelectedQuestion,
   questions,
   setQuestions,
   answers,
   setAnswers,
}) {
   const [modalIsOpen, setIsOpen] = useState(false);

   function openModal(question) {
      setIsOpen(true);
      setSelectedQuestion(question.questionId);
   }

   function closeModal() {
      setIsOpen(false);
   }

   function onDelete(e) {
      e.preventDefault();
      const newQuestions = questions.filter(
         (q) => q.questionId !== selectedQuestion
      );
      setQuestions(newQuestions);
      const newAnswers = answers.filter(
         (a) => a.questionId !== selectedQuestion
      );
      setAnswers(newAnswers);
      closeModal();
   }
   Modal.setAppElement(document.getElementById("root"));

   const handleClick = (question) => {
      console.log("questionId: ", question.questionId);
      setSelectedQuestion(question.questionId);
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
               {questions.map((question) => (
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
