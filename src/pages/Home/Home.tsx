import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./home.module.css";

const Home = () => {
  const { user, loading } = useAuth();

  return (
    <div className="container">
      <div className={styles.home_container}>
        <header className={styles.navbar}>
          <div className={styles.logo}>Auth App</div>
          <nav className={styles.nav_links}>
            {loading ? (
              <span className={styles.loading_small}>User Checking...</span>
            ) : user ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <div className={styles.links}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </nav>
        </header>

        <main className={styles.home_main}>
          <h1 className={styles.title}>Welcome to My App</h1>
          <p>This is a Firebase + React demo with real authentication.</p>
        </main>
      </div>
    </div>
  );
};

export default Home;

// mehodem176@bariswc.com

