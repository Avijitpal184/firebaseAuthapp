import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";

type LogInData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInData>();

  const handleFormSubmit = async (data: LogInData): Promise<void> => {
    try {
      await login(data, navigate);
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error occurred");
      }
    }
  };

  const handleGoogleLogIn = () => {
      loginWithGoogle(navigate);
  };

  return (
    <div className="container">
      <div className={styles.login}>
        <div className={styles.main_content}>
          <div className={styles.header}>
            <h1>Login to your account</h1>
            <p>Enter your details to access your account</p>
          </div>
          <div className={styles.divider} />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.input_conatiner}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                autoComplete="off"
                placeholder="Enter your email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.error_msg}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.input_conatiner}>
              <label htmlFor="password">Password</label>
              <input
                autoComplete="off"
                type="password"
                placeholder="Enter your password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className={styles.error_msg}>{errors.password.message}</p>
              )}
            </div>

            <button className={styles.login_button}>Log In</button>
          </form>

          <div className={styles.auth_options}>
            <p>
              Don't have any account ? <Link to="/signup">SignUp</Link>
            </p>
            <p className={styles.forgot_link}>
              <Link to="/forgotpassword">Forget Password ?</Link>
            </p>
            <p className={styles.bottom_divider}>
              <span>OR</span>
            </p>
            <button
              className={styles.google_button}
              type="button"
              onClick={handleGoogleLogIn}
            >
              <span>
                <FcGoogle />
              </span>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

