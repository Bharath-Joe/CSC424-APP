import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/account/register', {username, password, confirmPass});
            console.log(response)
        } catch (error) {
            alert("Invalid username or password.")
        }
    }

    return (
        <>
        <div class="divHome">
            <h2><font color="dodgerblue">Sign Up</font></h2>
            <form >
                <input type="text" placeholder="Username" value={username} onChange={event => setName(event.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={event => setConfirmPass(event.target.value)}/>
            </form>
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </div>
        </>
    );
};