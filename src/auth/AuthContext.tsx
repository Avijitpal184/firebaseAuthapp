import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type UserData = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  signUp: (data: UserData, navigate: (path: string) => void) => Promise<void>;
  login: (data: UserData, navigate: (path: string) => void) => Promise<void>;
  loginWithGoogle: (navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (
    { email, password }: UserData,
    navigate: (path: string) => void
  ): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created !", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      });
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = error.message || "";

        if (errorMessage.includes("auth/email-already-in-use")) {
          console.error("User already exists with this email");
          toast.error("User already exists with this email", {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            className: "toast",
          });
        } else {
          console.error("Something went wrong");
          toast.error("Something went wrong", {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            className: "toast",
          });
        }
      } else {
        console.error("Unexpected error occurred");
        toast.error("Unexpected error occurred", {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          className: "toast",
        });
      }
    }
  };

  const login = async (
    { email, password }: UserData,
    navigate: (path: string) => void
  ): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      toast.success("Welcome Back!", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = error.message;

        if (errorMessage.includes("auth/invalid-credential")) {
          toast.error("Login failed. Please try again.", {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            className: "toast",
          });
        } else {
          toast.error("Login failed. Please try again.", {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            className: "toast",
          });
        }
      } else {
        toast.error("Unexpected error occurred", {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          className: "toast",
        });
      }
    }
  };

  const loginWithGoogle = async (
    navigate: (path: string) => void
  ): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      await signInWithPopup(auth, provider);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Google login failed. Please try again.", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      });
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent check your inbox.", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      })
    } catch (error) {
      console.log(error);
      toast.error("Password reset failed. Please try again.", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      });
    }
  };

  const logout = async (navigate: (path: string) => void): Promise<void> => {
    try {
      await signOut(auth);
      toast.success("Logout successful", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      })
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.", {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        className: "toast",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signUp,
        loginWithGoogle,
        logout,
        loading,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
