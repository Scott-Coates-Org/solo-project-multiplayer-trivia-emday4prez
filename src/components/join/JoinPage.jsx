import Username from "./Username";
import Join from "./Join";
import styles from "./join.module.css";

export default function JoinPage({ categories }) {
   return (
      <div className={styles.joinPage}>
         <h2>join a game</h2>
         <Username />
         <Join />
      </div>
   );
}
