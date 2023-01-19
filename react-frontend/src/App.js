import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Landing } from "./Landing";
import { Home } from "./Home";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";

export const AuthContext = React.createContext(null);
const App = () => {    
    return (
        <AuthProvider>
            <Navigation />
            <div class="center">
                <h1>React Router</h1>
            </div>
            <Routes>
                <Route index element={<Home />} />
                <Route path="landing" element={
                    <ProtectedRoute>
                        <Landing />
                    </ProtectedRoute>} />
                <Route path="home" element={<Home />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </AuthProvider>
    );
};

const Navigation = () => {
    const {value} = useAuth();
    return (
        <nav class="navBar">
        <NavLink to="/home" style={{ textDecoration: 'none' }}>Home</NavLink>
        <NavLink to="/landing" style={{ textDecoration: 'none' }}>Landing</NavLink>
        {value.token && (
            <button type="button" onClick={value.onLogout}>
                Sign Out
            </button>
        )}
        </nav>
    )
}
  
export default App;