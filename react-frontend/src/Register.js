import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
    const [username, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/account/register', {username, phoneNumber, password, confirmPassword});
            console.log(response);
            setName("");
            setPhoneNumber("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            alert(JSON.stringify(error.response.data.message))
        }
    }

    return (
        <>
        <div class="divHome">
            <h2><font color="dodgerblue">Sign Up</font></h2>
            <form >
                <input type="text" placeholder="Username" value={username} onChange={event => setName(event.target.value)}/>
                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
            </form>
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </div>
        </>
    );
};