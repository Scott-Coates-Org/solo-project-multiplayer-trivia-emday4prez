import { useState, useEffect } from "react";
import Modal from "react-modal";
import { collection, getDocs } from "firebase/firestore";
import "./CategoryTable.module.css";
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

function CategoryTable() {
   const [modalIsOpen, setIsOpen] = useState(false);
   const [categories, setCategories] = useState([]);

   const fetchPost = async () => {
      await getDocs(collection(db, "categories")).then((querySnapshot) => {
         const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
         setCategories(newData);
      });
   };

   useEffect(() => {
      fetchPost();
   }, []);

   function openModal(cId) {
      setIsOpen(true);
      // setSelectedCategory(cId);
   }

   function closeModal() {
      setIsOpen(false);
   }

   function onDelete(e) {
      e.preventDefault();

      closeModal();
   }
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
                           <button>select</button>
                        </td>
                        <td>
                           <button
                              onClick={() => openModal(category.categoryId)}
                           >
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
