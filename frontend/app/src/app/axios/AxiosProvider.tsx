import axios from "axios";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

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

    return <>{children}</>
};