import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export const Home = () => {
    const { value } = useAuth(); 
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = async () => {
        value.username = username
        value.password = password
        value.onLogin();
    };

    function handleClick() {
        navigate("/register");
      }

    return (
        <>
        <div class="divHome">
            <h2><font color="dodgerblue">Log In</font></h2>
            <form >
                <input type="text" placeholder="Username" value={username} onChange={event => setName(event.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
            </form>
            <button type="submit" onClick={handleSubmit}>
                Sign In
            </button>
            <h6 class="dontHaveAccount" onClick={handleClick}>Don't have an account?</h6>
        </div>
        </>
    );
};