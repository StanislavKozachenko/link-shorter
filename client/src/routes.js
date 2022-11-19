import React from 'react'
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";
import {Navigate, Route, Routes} from "react-router-dom";

export const useRoutes = isAuth => {
    if(isAuth)
        return(
            <Routes>
                <Route path="/links" exact element={ <LinksPage/>}>
                </Route>
                <Route path="/create" exact element={ <CreatePage/>}>
                </Route>
                <Route path="/detail/:id" element={<DetailPage/>}>
                </Route>
                <Route path="*" element={ <Navigate to="/create"/>}>
                </Route>

            </Routes>
        )
    return (
        <Routes>
            <Route path="/" exact element={ <AuthPage/>}>
            </Route>
            <Route path="*" element={ <Navigate to="/"/>}>
            </Route>
        </Routes>
    )
}