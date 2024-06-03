import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios"

export const AuthContext = createContext('')
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
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

  useEffect( () =>{
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = {email: userEmail};
      setUser(currentUser);
      console.log('User in the on state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
      // if(currentUser){
      //   axios.post(`http://localhost:5000/jwt`, loggedUser, {withCredentials: true})
      //   .then(res =>{
      //     console.log('token response', res.data);
      //   })
      // }
      // else{
      //   axios.post(`http://localhost:5000/logout`, loggedUser, {withCredentials: true})
      //   .then(res =>{
      //     console.log(res.data);
      //   })
      // }
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

  const authInfo = { loading, success, setSuccess, error, setError, showPassword, setShowPassword, createUser, loginUser, googleLogin, githubLogin, user, setUser, updateUserProfile, logout };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;