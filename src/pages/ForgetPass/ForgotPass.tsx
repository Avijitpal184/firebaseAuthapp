// import { useState } from "react";
// import { useAuth } from "../../auth/AuthContext";

// const ForgotPass = () => {
//   const [email, setEmail] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const { forgotPassword } = useAuth();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     try {

//       e.preventDefault();
//      await forgotPassword(email);
//       setMessage("Password reset email sent check your inbox.");
//     } catch (error) {
//       setMessage((error as Error).message);
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Your Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Send Reset Email</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPass;

import { useForm } from "react-hook-form";
import styles from "./forgotPass.module.css";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

type ForgotPass = {
  email: string;
};

const ForgotPass = () => {
  const [message, setMessage] = useState<string>("");
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPass>();

  const handleFormSubmit = async (data: ForgotPass): Promise<void> => {
    try {
      await forgotPassword(data.email);
      setMessage("Password reset email sent check your inbox.");
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error occurred");
        setMessage((error as Error).message);
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.forgot_pass}>
        <div className={styles.main_content}>
          <div className={styles.header}>
            <h1>Reset your password</h1>
            <p>Enter your email to reset your password</p>
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
            <div className={styles.auth_options}>
              <p>
                Go to login page ? <Link to="/login">Login</Link>
              </p>
            </div>
            <button className={styles.forgot_button}>Send Reset Email</button>
          </form>
          {message && <p className={styles.success_msg}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
