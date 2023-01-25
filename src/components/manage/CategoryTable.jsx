import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
   collection,
   getDocs,
   doc,
   setDoc,
   Timestamp,
   deleteDoc,
   query,
   where,
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

   //const questionsRef = collection(db, "questions");
   //const answersRef = collection(db, "answers");
   //const categoriesRef = collection(db, "categories");

   // const fetchPost = async () => {
   //    await getDocs(categoriesRef).then((querySnapshot) => {
   //       const newData = querySnapshot.docs.map((doc) => ({
   //          ...doc.data(),
   //          id: doc.id,
   //       }));
   //       setCategories(newData);
   //    });
   // };

   // useEffect(() => {
   //    fetchPost();
   // }, [categoriesRef]);

   // async function deleteAnswersByQuestionId(arrayOfIds) {
   //    for (let id of arrayOfIds) {
   //       const answerQuery = query(answersRef, where("questionId", "==", id));
   //       const querySnapshot = await getDocs(answerQuery);
   //       querySnapshot.docs.forEach(async (doc) => {
   //          await deleteDoc(doc.ref);
   //       });
   //    }

   //    return;
   // }
   function openModal(categoryId, categoryDocId) {
      setIsOpen(true);
      setSelectedCategoryId(categoryId);
      setCategoryDocId(categoryDocId);
   }

   function closeModal() {
      setIsOpen(false);
   }

   async function onDelete(e) {
      e.preventDefault();
      await deleteDoc(doc(db, "categories", categoryDocId));
      closeModal();
      // const questionIds = new Set([]);
      // const reference = doc(db, "categories", selectedCategoryDocId);
      // console.log(selectedCategoryId);
      // const q = query(
      //    questionsRef,
      //    where("categoryId", "==", selectedCategoryId)
      // );
      // try {
      //    const querySnapshot = await getDocs(q);
      //    const qIds = querySnapshot.docs.map((doc) => {
      //       return doc.data();
      //    });

      //    qIds.forEach((q) => {
      //       questionIds.add(q.questionId);
      //    });
      //    const idsToDelete = Array.from(questionIds);
      //    setQuestionIdsToDelete(idsToDelete);
      //    deleteAnswersByQuestionId(questionIdsToDelete);
      //    querySnapshot.docs.forEach(async (doc) => {
      //       await deleteDoc(doc.ref);
      //    });
      //    await deleteDoc(reference);
      //    // deleteDoc(doc.ref);
      // } catch (e) {
      //    console.log("error: ", e.message);
      // }
   }

   const addCategory = async () => {};

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
                        {/* <td>{category.lastUpdated}</td> */}
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
                     <input type="text"></input>
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
