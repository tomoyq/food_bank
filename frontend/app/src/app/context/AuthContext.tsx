import React, { createContext, useEffect, useState } from "react";

import { customAxios } from "../axios/AxiosProvider";

type Props = {
    children?: any;
};

export const AuthContext = createContext({} as {
    loggedIn: boolean | null; 
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
    logout: () => void;
});

export const AuthContextProvider: React.FC<Props> = ({children}) => {
    //ログイン状態
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

    //ログアウト関数
    const logout = () => {
        customAxios.post('/logout/', {})
        .then(() => {
            setLoggedIn(false);
        })
        .catch((e) => {
            console.log(e.data);
        });
    };

    useEffect(() => {
        //前にログイン済みの時の再来訪時にトークンをリフレッシュさせて自動ログインさせる
        const tokenRefresh = async () => {
            try {
                await customAxios.post('/refresh/', {})
            } catch {
                setLoggedIn(false);
            }
            setLoggedIn(true) 
        };

        tokenRefresh();
    }, []);

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn, logout}}>
            {children}
        </AuthContext.Provider>
    );
};