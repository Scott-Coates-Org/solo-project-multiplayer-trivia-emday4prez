import { useRef } from "react";
import styles from "./create.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

function makeid(length) {
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
   username,
   setUsername,
   categories,
   setGameDocId,
}) {
   const inputRef = useRef();

   const onContinue = async () => {
      if (inputRef.current.value.length < 2) {
         alert("username must be at least 2 characters long");
         return;
      }
      setUsername(inputRef.current.value);

      const gameRef = await addDoc(collection(db, "games"), {
         roomCode: makeid(4),
         usernames: [inputRef.current.value],
         category: categories.filter((c) => c.questionCount > 0)[0].id,
         creator: inputRef.current.value,
         dateCreated: new Date().toLocaleDateString(),
      });
      setGameDocId(gameRef.id);
   };

   return (
      <div className={styles.userForm}>
         <h2>enter your name</h2>
         <input type="text" ref={inputRef} />
         <div className={styles.space}></div>
         <div className={styles.buttonContainer}>
            <button onClick={onContinue}>continue</button>
         </div>
      </div>
   );
}
