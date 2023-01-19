import { useAuth } from "./context/AuthProvider";
import React, { useState } from 'react';

export const Home = () => {
    const { value } = useAuth(); 
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        value.onLogin();
        value.username = username
        value.password = password
    };

    return (
        <>
        <div class="divHome">
            <h2>
                <font color="dodgerblue">Log In</font>
            </h2>
            <form >
                <input type="text" placeholder="Username" value={username} onChange={event => setName(event.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
            </form>
            <button type="submit" onClick={handleSubmit}>
                Sign In
            </button>
        </div>
        </>
    );
};