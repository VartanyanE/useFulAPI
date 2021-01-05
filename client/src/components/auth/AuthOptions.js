import React, { Component, useContext } from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions () {

    const history = useHistory();

    const {userData, setUserData} = useContext(UserContext);

    const register = () =>history.push("/register");
    const login = () => history.push("/login")
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "");
    }
    
        return (
            <div>
                {userData.user ? 
                    <button onClick={logout}>Logout</button>
                 : 
                    <>
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
                </>
    }
            </div>
        )
    }

