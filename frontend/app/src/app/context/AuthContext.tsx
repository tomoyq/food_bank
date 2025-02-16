import React, { createContext, useState } from "react";

import { customAxios } from "../axios/AxiosProvider";

type Props = {
    children?: React.ReactNode;
};

export const AuthContext = createContext({} as {
    loggedIn: boolean | null; 
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
    logout: () => void;
});

export const AuthContextProvider: React.FC<Props> = ({children}) => {
    //ログイン状態
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

    //前にログイン済みの時の再来訪時にトークンをリフレッシュさせて自動ログインさせる
    const tokenRefresh = () => {
        customAxios.post('/refresh/', {})
        .then(() => {
            setLoggedIn(true);
        })
        .catch(() => {
            setLoggedIn(false);
        });
    };

    //nullの場合は初めて開く場合とページ再来訪の場合
    if (loggedIn === null)  {
        tokenRefresh();
    };

    //ログアウト関数
    const logout = () => {
        customAxios.post('/logout/', {})
        .then(() => {
            setLoggedIn(false);
        })
        .catch((e) => {
            console.log(e.data);
        });
    }

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn, logout}}>
            {children}
        </AuthContext.Provider>
    );
};