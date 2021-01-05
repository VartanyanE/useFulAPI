import Axios from 'axios';
import React, {useState, useContext} from 'react';
import UserContext from "../../context/UserContext";
import {useHistory} from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
     const history = useHistory();
    const {setUserData} =useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {email, password, passwordCheck, displayName};

        await Axios.post(
            "http://localhost:3001/users/register", newUser
        );
        const loginRes= await Axios.post("http://localhost:3001/users/login", {email, password})
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");


    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Verify-Password" onChange={(e) => setPasswordCheck(e.target.value)}/>

                <label htmlFor="register-display-name">Display Name</label>
                <input id="register-display-name" type="text" onChange={(e) => setDisplayName(e.target.value)} />

                <input type="submit" value="register" />
            </form>
        </div>
    )
}
