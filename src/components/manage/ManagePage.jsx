import { useState } from "react";
import CategoryTable from "./CategoryTable";
import QuestionsTable from "./QuestionsTable";
import AnswersTable from "./AnswersTable";
function Manage() {
   const [selectedQuestionId, setSelectedQuestionId] = useState("");
   return (
      <div>
         <h2>MGMT</h2>

         <CategoryTable
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
         />

         <QuestionsTable
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
         />
         <AnswersTable
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
         />
      </div>
   );
}

export default Manage;
