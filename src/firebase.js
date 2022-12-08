import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, updateProfile, onAuthStateChanged, updateEmail ,updatePassword ,sendEmailVerification ,signInWithEmailAndPassword, signOut } from 'firebase/auth';
import toast from "react-hot-toast";
import store from './store/index'
import { login as loginHandle, logout as logoutHandle } from './store/auth';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth();


export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        
        return user;

    }catch (error) {
        toast.error(error.message);
    }
}

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        return user;
        
    }catch (error) {
        toast.error(error.message);
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
        return true;
        
    }catch (error) {
        toast.error(error.message);
    }

}

export const update = async data => {
    try {
        await updateProfile(auth.currentUser, data)
        toast.success('Profile Updated Successfully.')
        return true;
    }
    catch (error) {
        toast.error(error.message);
    }
}

export const resetPassword = async ({password}) => {
    try {
        await updatePassword(auth.currentUser, password)
        toast.success('Your password has been successfully updated.');
        return true

    }catch (error) {
        toast.error(error.message);
    }
}

export const _updateEmail = async (newEmail) =>  {
    try {
        await updateEmail(auth.currentUser, newEmail)

        toast.success('Email Address has been successfully updated.')

        return true;

    }catch (error) {
        toast.error(error.message)
    }

}

export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`Verification Mail has been sent to ${auth.currentUser.email}. Please check.`)
        return true;
        
    }catch (error) {
        toast.error(error.message);
    }
}


// Aşağıdaki fonksiyon ile şu anda ya da o an oturum açmış olan kullanıcıyı alıyoruz.
// Hangi kullanıcı ne zaman oturum açarsa o zaman o oturum açmış olan kullanıcının bilgilerini alıyoruz.
// Yani oturum açmış olan kullanıcıyı alıyoruz. ve user parametresine geçiriyoruz.

onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch(loginHandle(
            {
                displayName:user.displayName,
                email:user.email,
                emailVerified:user.emailVerified,
                photoURL:user.photoURL,
                uid:user.uid
            }
        ))
    } else {
        store.dispatch(logoutHandle())
    }
});


export default app;