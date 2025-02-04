import React from "react"
import { useContext } from 'react';

import { AuthContext } from '../../../app/context/AuthContext';

export const FridgeContent: React.FC = () => {
    const loggedIn = useContext(AuthContext);
    
    console.log(loggedIn);

    return <h1>home</h1> 
};