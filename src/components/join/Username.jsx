import styles from "./join.module.css";
import { useRef } from "react";

export default function Username({ setUsername }) {
   const inputRef = useRef();

   const onContinue = async () => {
      if (inputRef.current.value.length.trim() < 2) {
         alert("username must be at least 2 characters long");
         return;
      }
      setUsername(inputRef.current.value);
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
