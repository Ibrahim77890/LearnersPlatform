import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    //Simply store the details of user and then provide it to all required path components
    const [user, setUser] = useState(null);

    const logIn = (userData) => {
        setUser(userData);
    }

    const logOut = () => {
        setUser(null);
    }

    return(<AuthContext.Provider value={{user, logIn, logOut}}>
        {children}
    </AuthContext.Provider>);
}

export const useAuth = () => useContext(AuthContext);
