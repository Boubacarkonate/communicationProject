//service/FirebaseService.js

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CollectionReference, addDoc, collection, getFirestore } from "firebase/firestore";

class FirebaseService {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyAhg1KLo1qqUBGuWr0OMyFzU91MQJtg56M",
            authDomain: "app-communication-9a463.firebaseapp.com",
            projectId: "app-communication-9a463",
            storageBucket: "app-communication-9a463.appspot.com",
            messagingSenderId: "256938571973",
            appId: "1:256938571973:web:e992f6a386e8f9bf7d98ac"
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
            if (error.code === 'auth/invalid-sign out') {
                message = "non déconnecté";
            }
        }
        
        return message;
    }

    async addMessage(message) {
        const { _id, createdAt, text, user } = message;
    
        await addDoc(this.messageCollection, {
            id: _id, // Utiliser l'ID de message de GiftedChat comme ID dans Firestore
            createdAt,
            text,
            userUid: user._id // Utiliser l'ID de l'utilisateur de GiftedChat comme userUid dans Firestore
        });
    }
}

export default new FirebaseService();
