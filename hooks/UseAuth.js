//hooks/UseAuth.js

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
    const context = useContext(AuthContext);
    return context.user;
}

export default useAuth; 
