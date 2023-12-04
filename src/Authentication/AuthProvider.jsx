import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app); 
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser=(name, photo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo
        })
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password);
    }

    const provider = new GoogleAuthProvider();
    const googleSignIn=()=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setLoading(false);
            const userEmail = currentUser?.email||user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            console.log("Current User: ", currentUser);
            if(currentUser){
                
                axios.post('https://real-state-server-seven.vercel.app/jwt',loggedUser, {withCredentials: true})
                .then(res=>{
                    console.log(res.data);
                })
            }
            else{
                axios.post("https://real-state-server-seven.vercel.app/logout", loggedUser, {withCredentials: true})
                .then(res=>{
                    console.log(res.data);
                })
            }
        })

        return ()=>{
            unSubscribe();
        }
    }, [user?.email])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUser,
        googleSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;