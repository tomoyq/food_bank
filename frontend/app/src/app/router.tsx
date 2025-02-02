import { BrowserRouter, Routes, Route } from "react-router";

import { FridgeContent } from "./routes/app/fridgeContent";
import {Login} from "./routes/auth/login"

export const AppRouter = () => {
  
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FridgeContent />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
  };