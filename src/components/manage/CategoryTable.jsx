import { useState, useRef } from "react";
import Modal from "react-modal";
import {
   query,
   doc,
   where,
   deleteDoc,
   collection,
   getDocs,
   setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import "./CategoryTable.module.css";

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

function CategoryTable({
   categories,
   selectedCategoryId,
   setSelectedCategoryId,
}) {
   console.log("render categories", categories);

   const [modalIsOpen, setIsOpen] = useState(false);
   const [categoryDocId, setCategoryDocId] = useState("");
   const [categoryToAdd, setCategoryToAdd] = useState("");
   const inputRef = useRef();

   function openModal(categoryId, categoryDocId, selectedQuestionId) {
      setIsOpen(true);
      setSelectedCategoryId(categoryId);
      setCategoryDocId(categoryDocId);
   }

   function closeModal() {
      setIsOpen(false);
   }

   async function onDelete(e) {
      const questionIds = new Set([]);
      e.preventDefault();
      const q = query(
         collection(db, "questions"),
         where("categoryId", "==", selectedCategoryId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach(async (doc) => {
         const data = doc.data();
         questionIds.add(data.questionId);
         await deleteDoc(doc.ref);
      });
      const answersQuery = query(
         collection(db, "answers"),
         where("questionId", "in", Array.from(questionIds))
      );
      const answersQuerySnapshot = await getDocs(answersQuery);
      answersQuerySnapshot.docs.forEach(async (doc) => {
         await deleteDoc(doc.ref);
      });

      await deleteDoc(doc(db, "categories", categoryDocId));
      closeModal();
   }

   const addCategory = async () => {
      setCategoryToAdd(inputRef.current.value);
      if (inputRef.current.value.length < 3) {
         alert("Category name must be at least 3 characters long");
         return;
      }

      const docData = {
         categoryName: inputRef.current.value,
         questionCount: 0,
         lastUpdated: new Date().toLocaleString(),
         categoryId: Math.floor(Math.random() * 1000000).toString(),
      };
      try {
         await setDoc(doc(db, "categories", inputRef.current.value), docData);
      } catch (e) {
         console.error(e);
      }

      inputRef.current.value = "";
   };

   Modal.setAppElement(document.getElementById("root"));

   return (
      <div>
         <h1>edit game categories</h1>

         <table>
            <thead>
               <tr>
                  <th>Category Name</th>
                  <th>Question Count</th>
                  <th>Last Updated</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {categories &&
                  categories.map((category) => (
                     <tr key={category.categoryId}>
                        <td>{category.categoryName}</td>
                        <td>{category.questionCount}</td>
                        <td>{category.lastUpdated}</td>
                        <td>
                           <button
                              onClick={() =>
                                 setSelectedCategoryId(category.categoryId)
                              }
                           >
                              select
                           </button>
                        </td>
                        <td>
                           <button
                              onClick={() =>
                                 openModal(category.categoryId, category.id)
                              }
                           >
                              delete
                           </button>
                        </td>
                     </tr>
                  ))}
               <tr>
                  <td>
                     <input type="text" ref={inputRef}></input>
                  </td>
                  <td>
                     <button onClick={addCategory}>add</button>
                  </td>
               </tr>
            </tbody>
         </table>

         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="delete category"
         >
            <h2>delete category</h2>
            <div>are you sure you want to delete</div>
            <form>
               <button onClick={closeModal}>cancel</button>
               <button onClick={onDelete}>delete</button>
            </form>
         </Modal>
      </div>
   );
}

export default CategoryTable;
