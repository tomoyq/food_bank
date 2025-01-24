import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "../App";
import {Login} from "./routes/auth/login"

export const AppRouter = () => {
  
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
  };