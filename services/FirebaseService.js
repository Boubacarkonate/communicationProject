import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



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
        
    }

    async logout() {
        try {
            await this.auth.signOut();
        } catch (error) {
            if (error.code === 'auth/invalid-sign out') {
                message = "non déconnecté";
            }
        } 
    }
}

export default new FirebaseService();
