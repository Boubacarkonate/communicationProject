//service/FirebaseService.js

import Config from "./Config";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CollectionReference, addDoc, collection, getFirestore } from "firebase/firestore";

class FirebaseService {
    constructor() {
        const firebaseConfig = {
            apiKey: Config.apiKey,
            authDomain: Config.authDomain,
            projectId: Config.projectId,
            storageBucket: Config.storageBucket,
            messagingSenderId: Config.messagingSenderId,
            appId: Config.appId
        };

        const app = initializeApp(firebaseConfig);

        this.auth = getAuth(app);
        this.firestore = getFirestore(app);
        this.messageCollection = collection(this.firestore, 'messages');
    }

    async register(email, password) {
        let message = 'Inscription réussie';
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                message = "cette adresse email est incorrecte";
            }
        }
        
        return message;
    }

    async login(email, password) {
        let message = 'Connexion réussie';
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                message = "cette adresse email est incorrecte";
            }
        }
        
        return message;
    }

    async logout() {
        let message = 'Déconnexion réussie';
        try {
            await this.auth.signOut();
        } catch (error) {
            if (error.code === 'auth/invalid-signout') {
                message = "non déconnecté";
            }
        }
        
        return message;
    }

    async addMessage(message) {
        const { _id, createdAt, text, user } = message;
    
        await addDoc(this.messageCollection, {
            _id, // Utiliser l'ID de message de GiftedChat comme ID dans Firestore
            createdAt,
            text,
            user // Utiliser l'ID de l'utilisateur de GiftedChat comme userUid dans Firestore
        });
    }
    
}

export default new FirebaseService();
