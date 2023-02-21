import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthProvider.js";

export const Landing = () => {
    const { value } = useAuth();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:5000/account/users', {
            headers: {
                Authorization: `Bearer ${value.token}`
            }
        }).then(response => {
            setUsers(response.data);
            document.cookie = `jwt_token=${value.token}; path=/`
        });
    }, [value.token]);
    return (
    <>
        <h2>Contacts List</h2>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Phone Number</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.phoneNumber}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div> Authenticated as {value.token}</div>
    </>
    );
};