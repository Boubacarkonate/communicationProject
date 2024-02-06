
import { createContext, useEffect, useState } from 'react';
import FirebaseService from "../services/FirebaseService";

export const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const value = { user };

    useEffect(() => {
        const unsubscribe = FirebaseService.auth.onAuthStateChanged(setUser);

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
