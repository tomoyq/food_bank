import React, { createContext, useState } from "react";

type Props = {
    children?: React.ReactNode;
};

export const AuthContext = createContext({});

export const AuthContextProvider: React.FC<Props> = ({children}) => {
    //ログイン状態
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};