import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";

type SignUpData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, loginWithGoogle, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpData>();

  const handleFormSubmit = async (data: SignUpData): Promise<void> => {
    try {
      await signUp(data, navigate);
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error occurred");
      }
    }
  };

  const handleGoogleSignUp = () => {
    loginWithGoogle(navigate);
  };

  return (
    <div className="container">
      <div className={styles.signup}>
        <div className={styles.main_content}>
          <div className={styles.header}>
            <h1>Create your account</h1>
            <p>Hello! Please tell us little bit about yourself </p>
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

            <button className={styles.signup_button}>Sign Up</button>
          </form>

          <div className={styles.auth_options}>
            <p>
              Already have an account? <Link to="/login">LogIn</Link>
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
              onClick={handleGoogleSignUp}
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

export default SignUp;
