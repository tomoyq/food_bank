import axios from "axios";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

type Props = {
    children? :React.ReactNode;
};

export const AxiosProvider: React.FC<Props> = ({children}) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
    axios.defaults.withCredentials = true;

    //const loggedIn = useContext(AuthContext);

    return <>{children}</>
};