import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = (googleProvider) => {
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = (githubProvider) => {
    return signInWithPopup(auth, githubProvider);
  };
  const logOutUser = () => {
    return signOut(auth);
  };

  // states manage

  useEffect(() => {
    const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubsCribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
        <span className="loading loading-bars loading-xl text-purple-700"></span>
      </div>
    );
  }
  const info = {
    user,
    loading,
    setLoading,
    setUser,
    createUser,
    loginUser,
    googleLogin,
    githubLogin,
    logOutUser,
  };
  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
