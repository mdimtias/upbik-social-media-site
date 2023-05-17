import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from './../firebase/firebase.config'
export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    // Create User
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign In
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // Google Sign In
    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    //Update User
    const updateUser = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    }
    // Reset Password 
    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    // Logout User
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        });

        return ()=> unsubscribe();

    }, [auth])

    const userInfo = {
        loading, 
        setLoading, 
        user,
        createUser, 
        signIn,
        googleSignIn,
        updateUser,
        resetPassword,
        logOut
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;