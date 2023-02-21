import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export const Home = () => {
    const { value } = useAuth(); 
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    
    // useEffect(() => {
    //     var temp = document.cookie.split("=");
    //     value.token = temp[1];     
    //     console.log(value.token)
    //     if (value.token) {
    //         document.cookie = `jwt_token=${value.token}; path=/`
    //     }
    //   }, []);
    

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
            {!value.token ? (
                <>
                <h2><font color="dodgerblue">Log In</font></h2>
                <form>
                        <input type="text" placeholder="Username" value={username} onChange={event => setName(event.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                    </form>
                    <button type="submit" onClick={handleSubmit}>
                            Sign In
                        </button>
                    <h6 class="dontHaveAccount" onClick={handleClick}>Don't have an account?</h6></>
            ): null}
        </div>
        </>
    );
};