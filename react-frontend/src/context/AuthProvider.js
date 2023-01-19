import { createContext, useContext, useState } from "react";
import { fakeAuth } from "../utils/FakeAuth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState('');

    const handleLogin = async () => {
        const token = await fakeAuth();
        if (value.username === "bharath" && value.password === "1121") {
            setToken(token);
            navigate("/landing");
        }
        else {
            alert("Incorrect username or password.")
        }
    };

    const handleLogout = () => {
        setToken(null);
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={{ value }}>
        {children}
        </AuthContext.Provider>
    );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);