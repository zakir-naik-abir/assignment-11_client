import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState('');

  // create user
  const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // login user with email and password
  const loginUser = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // login user with google
  const googleProvider = new GoogleAuthProvider;
  const googleLogin = () =>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  // login user with github
  const githubProvider = new GithubAuthProvider;
  const githubLogin = () =>{
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  }

  // current user
  const [user, setUser] = useState(null);
  useEffect( () =>{
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
      console.log('User in the on state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
    })
    return unSubscribe;
  },[])
  
  // update user profile
  const updateUserProfile = (name, image) =>{
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: image,
    })
  }

  // logout
  const logout = () =>{
    return signOut(auth);
  }

  const authInfo = { loading, success, setSuccess, error, setError, showPassword, setShowPassword, createUser, loginUser, googleLogin, githubLogin, user, updateUserProfile, logout };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;