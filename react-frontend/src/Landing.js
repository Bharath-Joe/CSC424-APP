import React from "react";
import { useAuth } from "./context/AuthProvider.js";

export const Landing = () => {
    const { value } = useAuth();
    return (
    <>
        <h2>Landing (Protected)</h2>
        <div> Authenticated as {value.token}</div>
    </>
    );
};