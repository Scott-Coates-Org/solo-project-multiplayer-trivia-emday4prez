import styles from "./join.module.css";

export default function Username({ username, setUsername }) {
   const onContinue = async () => {
      if (username.length < 2) {
         alert("username must be at least 2 characters long");
         return;
      }
   };

   return (
      <div className={styles.userForm}>
         <h2>enter your name</h2>
         <input type="text" onBlur={(e) => setUsername(e.target.value)} />
         <div className={styles.space}></div>
         <div className={styles.buttonContainer}>
            <button onClick={onContinue}>continue</button>
         </div>
      </div>
   );
}
