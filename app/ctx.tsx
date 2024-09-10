import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import {Redirect, router} from "expo-router";
import {FirebaseApp, initializeApp} from "firebase/app";
import {login} from "@/services/auth";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp)

const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signUp: (email: string, username: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    firebaseApp?: FirebaseApp | null;
}>({
    signIn: () => null,
    signUp: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
    firebaseApp: firebaseApp
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (email: string, password: string) => {
                    return login(email, password, setSession, firebaseApp);
                },
                signUp: (email: string, username: string, password: string) => {
                    setSession("xxxxx");
                    return router.replace("(tabs)");
                },
                signOut: () => {
                    setSession(null);
                    return router.replace("/sign-in");
                },
                firebaseApp: firebaseApp,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
