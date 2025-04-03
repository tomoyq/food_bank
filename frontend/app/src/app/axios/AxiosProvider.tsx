import axios from "axios";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { error } from "console";

type Props = {
    children? :React.ReactNode;
};

export const customAxios = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: true,
    headers: {
       'Accept':  'application/json',
       'Content-Type': 'application/json;charset=utf-8',
       'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
       'X-Requested-With': 'XMLHttpRequest'
    }
});

export const AxiosProvider: React.FC<Props> = ({children}) => {   
    const {loggedIn, setLoggedIn} = useContext(AuthContext);

    //アプリ使用時にアクセストークンの期限が切れて認証エラーになったときにリフレッシュする
    customAxios.interceptors.response.use((response) => {
        // ステータスコードが 2xx の範囲にある場合
        return response;
    }, (error) => {
        //status_codeが401(unAuthorised)の時のみリフレッシュapiをたたく
        if (error.status_code === 401) {
            (async () => {
                try {
                    await customAxios.post('/refresh/', {})
                    setLoggedIn(true);
                    console.log(loggedIn);
                } catch {
                    setLoggedIn(false);
                    console.log(loggedIn);
                }
            }) ();
        } else {
            return Promise.reject(error);
        }
    })

    return <>{children}</>
};