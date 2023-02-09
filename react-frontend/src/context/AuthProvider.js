import { createContext, useContext, useState } from "react";
// import { fakeAuth } from "../utils/FakeAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/account/login', {value});
            console.log(response);
            if(response.status === 200){
                setToken(response.data.token);
                navigate('/landing');
            }
        } catch (error) {
            alert(JSON.stringify(error.response.data.message)) 
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