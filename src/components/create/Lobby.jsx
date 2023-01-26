import styles from "./create.module.css";

export default function Lobby({ lobbyOptions }) {
   return (
      <div className={styles.lobby}>
         <h1>start game</h1>
         <p>choose a game category</p>
         <div className={styles.categorySelect}></div>
      </div>
   );
}
