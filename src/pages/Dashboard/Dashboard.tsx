import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import styles from "./dashboard.module.css";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading, navigate]);

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles.user}>Welcome, <span>{user?.email}</span></p>
        <button className={styles.logout_btn} onClick={() => logout(navigate)}>Log Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
