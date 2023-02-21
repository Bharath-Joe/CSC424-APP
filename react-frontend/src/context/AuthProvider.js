import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    useEffect(() => {
        var temp = document.cookie.split("=");
        const token = temp[1]; 
        setToken(temp[1]);    
        console.log(token)
        if (token) {
            document.cookie = `jwt_token=${token}; path=/`
        }
      }, []);

    const handleLogin = async () => {
        
        try {
            const response = await axios.post('https://localhost:5000/account/login', {value});
            if(response.status === 200){
                setToken(response.data.token);
                document.cookie = `jwt_token=${response.data.token}; path=/`
                navigate('/landing');
            }
        } catch (error) {
            alert(JSON.stringify(error.response.data.message)) 
        }
    }

    const handleLogout = () => {
        document.cookie = `jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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