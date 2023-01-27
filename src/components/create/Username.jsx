import { useRef } from "react";
import styles from "./create.module.css";
export default function Username({ username, setUsername }) {
   const inputRef = useRef();
   const onContinue = () => {
      if (inputRef.current.value.length < 2) {
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
