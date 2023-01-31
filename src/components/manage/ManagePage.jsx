import { useState } from "react";
import CategoryTable from "./CategoryTable";
import QuestionsTable from "./QuestionsTable";
import AnswersTable from "./AnswersTable";
import { useCollection } from "../../hooks/useCollection";

function Manage() {
   console.log("manage page");

   const [selectedQuestionId, setSelectedQuestionId] = useState("");
   const [selectedCategoryId, setSelectedCategoryId] = useState("");
   const [selectedAnswerDocId, setSelectedAnswerDocId] = useState("");
   // const { documents: categories } = useCollection("categories");
   // const { documents: questions } = useCollection("questions");
   // const { documents: answers } = useCollection("answers");
   return (
      <div>
         <h2>MGMT</h2>

         {categories && (
            <CategoryTable
               categories={categories}
               selectedCategoryId={selectedCategoryId}
               setSelectedCategoryId={setSelectedCategoryId}
               selectedQuestionId={selectedQuestionId}
            />
         )}

         {questions && (
            <QuestionsTable
               questions={questions}
               selectedCategoryId={selectedCategoryId}
               selectedQuestionId={selectedQuestionId}
               setSelectedQuestionId={setSelectedQuestionId}
            />
         )}
         {answers && (
            <AnswersTable
               answers={answers}
               selectedQuestionId={selectedQuestionId}
               selectedAnswerDocId={selectedAnswerDocId}
               setSelectedAnswerDocId={setSelectedAnswerDocId}
               selectedCategoryId={selectedCategoryId}
            />
         )}
      </div>
   );
}

export default Manage;
