import { createContext, useContext, useState } from "react";
// import { fakeAuth } from "../utils/FakeAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    // const handleLogin = async () => {
    //     const token = await fakeAuth();
    //     if (value.username === "bharath" && value.password === "1121") {
    //         setToken(token);
    //         console.log("Valid")
    //         navigate("/landing");
    //     }
    //     else {
    //         alert("Incorrect username or password.")
    //     }
    // };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/account/login', {value});
            console.log(response);
            if(response.status === 200){
                setToken(response.data.token);
                navigate('/landing');
            }
        } catch (error) {
            alert("Incorrect username or password.")
        }
    }

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