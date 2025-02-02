import axios from "axios";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

type Props = {
    children? :React.ReactNode;
};

export const AxiosProvider: React.FC<Props> = ({children}) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    

    //const loggedIn = useContext(AuthContext);

    return <>{children}</>
};