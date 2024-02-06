import { useContext } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";

function UseAuth() {
    const context = useContext(AuthContext);

    return context.user;
}

export default { UseAuth, AuthProvider };

