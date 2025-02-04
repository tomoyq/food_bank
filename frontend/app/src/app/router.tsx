import { BrowserRouter, Routes, Route } from "react-router";

import { FridgeContent } from "./routes/app/fridgeContent";
import { Login } from "./routes/auth/login"
import { Layout } from "../components/layouts/Layout"

export const AppRouter = () => {
  
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<FridgeContent />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
  };