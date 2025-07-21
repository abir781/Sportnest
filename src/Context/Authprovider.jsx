import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { Authcontext } from './Authcontext';

const provider = new GoogleAuthProvider();

const Authprovider = ({children}) => {
     const [user, setuser]=useState(null);
    const [loading,setloading]=useState(true);

     const createuser=(email,password)=>{
            setloading(true);
            return createUserWithEmailAndPassword(auth,email,password);
        }

      const signin=(email,password)=>{
            setloading(true);
            return signInWithEmailAndPassword(auth,email,password);
        }

         const signinwithgoogle=()=>{
                    setloading(true);
                    return signInWithPopup(auth, provider)
                }

           const updateuser=(updateddata)=>{
        return updateProfile(auth.currentUser, updateddata)
    }

     const logout=()=>{
                setloading(true);
                return signOut(auth);
            };

      useEffect(()=>{
            const unsubscribe=onAuthStateChanged(auth,(currentuser)=>{
                setuser(currentuser);
                setloading(false);
            });
            return ()=>{
                unsubscribe();
            }
        })

        const authinfo={
            user,
            loading,
            createuser,
            signin,
            logout,
            setuser,
            updateuser,
            signinwithgoogle,
            
        }
     return (
          <Authcontext value={authinfo}>
              {children}
              
          </Authcontext>
      );
};

export default Authprovider;