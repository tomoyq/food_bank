import { BrowserRouter, Routes, Route } from "react-router";

import { FridgeContent, Message, Profile, Recipe } from "./routes/app/index";
import { Login } from "./routes/auth/login"
import { Layout } from "../components/layouts/Layout"

export const AppRouter = () => {
  
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<FridgeContent />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/message" element={<Message />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
  };