import { useContext, useState } from "react";
import CategoryTable from "./CategoryTable";
import QuestionsTable from "./QuestionsTable";
import AnswersTable from "./AnswersTable";
import { CategoriesContext } from "../../context/CategoriesProvider";
import { QuestionsContext } from "../../context/QuestionsProvider";
import { AnswersContext } from "../../context/AnswersProvider";

function Manage() {
   console.log("manage page");

   const [selectedQuestionId, setSelectedQuestionId] = useState("");
   const [selectedCategoryId, setSelectedCategoryId] = useState("");
   const [selectedAnswerDocId, setSelectedAnswerDocId] = useState("");
   const categories = useContext(CategoriesContext);
   const questions = useContext(QuestionsContext);
   const answers = useContext(AnswersContext);
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
