import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import {Redirect, router} from "expo-router";

const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signUp: (email: string, username: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signUp: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
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
                    // Perform sign-in logic here
                    setSession("xxxxx");
                    return router.replace("(tabs)");
                },
                signUp: (email: string, username: string, password: string) => {
                    // Perform sign-in logic here
                    setSession("xxxxx");
                    return router.replace("(tabs)");
                },
                signOut: () => {
                    setSession(null);
                    return router.replace("/sign-in");
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
