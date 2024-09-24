import {router} from "expo-router";
import {Auth, getAuth, signInWithEmailAndPassword, UserCredential} from "@firebase/auth";
import {createTables, insert} from "@/services/database";
import {UserInterface} from "@/interfaces/User";

const login = async (email, password, setSession) => {
    const auth: Auth = getAuth();

    try {
        const response: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user: any = response.user.toJSON();
        if(user){
            setSession(user.stsTokenManager.accessToken);
            const _user: UserInterface = {
                email: user.email,
                emailVerified: user.emailVerified.toString(),
                displayName: user.displayName ? user.displayName : "",
                uid: user.uid,
                photoURL: user.photoURL ? user.photoURL : "",
                phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                username: "",
                createdAt: user.createdAt,
                sync: 1,
            }
            await insert("user", _user);
            return router.replace("(tabs)");
        }

        throw new Error("Usuário incorreto");
    } catch (err) {
        console.error('Erro no login', err);
        throw err;
    }


}

export { login };