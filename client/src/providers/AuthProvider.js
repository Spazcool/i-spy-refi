import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    await auth.onAuthStateChanged(userAuth => {
      if(userAuth !== null){
        setUser({ user: userAuth});
        setIsAuth(true)
      }else{
        setIsAuth(false)
      }    
    });
    console.log('stuff')  
  }

  const logout = async () => {
    auth.signOut()
    setIsAuth(false);
    return <Redirect to='/' />
  };

  return <AuthContext.Provider value={{ isAuth, setIsAuth, checkAuth, logout, user }}>{children}</AuthContext.Provider>;
};