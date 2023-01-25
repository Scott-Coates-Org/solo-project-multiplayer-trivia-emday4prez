import { useState } from "react";
import CategoryTable from "./CategoryTable";
import QuestionsTable from "./QuestionsTable";
import AnswersTable from "./AnswersTable";
import { useCollection } from "../../hooks/useCollection";

function Manage() {
   const [selectedQuestionId, setSelectedQuestionId] = useState("");
   const [selectedCategoryId, setSelectedCategoryId] = useState("");
   const { documents: categories } = useCollection("categories");
   return (
      <div>
         <h2>MGMT</h2>

         <CategoryTable
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
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
