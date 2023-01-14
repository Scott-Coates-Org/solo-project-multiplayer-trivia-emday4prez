import { useState } from "react";
import answersData from "../../data/answers";
import Modal from "../modal/Modal";
const BUTTON_WRAPPER_STYLES = {
   position: "relative",
   zIndex: 1,
};

function AnswersTable({ selectedQuestion, setSelectedQuestion }) {
   const [isOpen, setIsOpen] = useState(false);
   const [answers, setAnswers] = useState(answersData);

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
                           <div style={BUTTON_WRAPPER_STYLES}>
                              <button onClick={() => setIsOpen(true)}>
                                 delete
                              </button>
                              <Modal
                                 open={isOpen}
                                 onClose={() => setIsOpen(false)}
                              >
                                 <p>
                                    Are you sure you want to delete this answer?
                                 </p>

                                 <p>{answer.answerContent}</p>
                              </Modal>
                           </div>
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   );
}

export default AnswersTable;
