import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
function Home() {
   return (
      <div className={styles.homepage}>
         <h2>Home</h2>
         <div className={styles.buttonsContainer}>
            <div className={styles.card}>
               <h3>create new game and invite others</h3>
               <Link to="/create">
                  <button>create</button>
               </Link>
            </div>
         </div>
         <div className={styles.buttonsContainer}>
            <div className={styles.card}>
               <h3>join a game already in progress</h3>
               <Link to="/join">
                  <button>join</button>
               </Link>
            </div>
         </div>
      </div>
   );
}
export default Home;
