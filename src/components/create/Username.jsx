import { useRef } from "react";
import styles from "./create.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/client";
import { Link } from "react-router-dom";

function makeId(length) {
   let result = "";
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   const charactersLength = characters.length;
   let counter = 0;
   while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
   }
   return result;
}

export default function Username({
   creatorName,
   setCreatorName,
   setGameDocId,
   categories,
}) {
   const code = makeId(4);
   const inputRef = useRef();

   const onContinue = async () => {
      if (inputRef.current.value.length < 2) {
         alert("username must be at least 2 characters long");
         return;
      }
      setCreatorName(inputRef.current.value);

      const gameRef = await addDoc(collection(db, "games"), {
         roomCode: code,
         usernames: [inputRef.current.value],
         category: categories.filter((c) => c.questionCount > 0)[0].id,
         creator: inputRef.current.value,
         dateCreated: new Date().toLocaleDateString(),
         started: false,
         inLobby: true,
      });
      setGameDocId(gameRef.id);
      //navigate(`/create/${code}`);
   };

   return (
      <div className={styles.userForm}>
         <h2>enter your name</h2>
         <input type="text" ref={inputRef} />
         <div className={styles.space}></div>
         <div className={styles.buttonContainer}>
            <Link to={`/create/lobby/${code}`} state={{ host: true }}>
               <button onClick={onContinue}>continue</button>
            </Link>
         </div>
      </div>
   );
}
