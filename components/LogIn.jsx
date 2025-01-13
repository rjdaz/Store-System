import React, { useState } from 'react';
import './LogIn.css'

export default function LogIn({ onLoginSuccess }) {

    const uName = "daz",
          pWord = "123";

    const logInWind = document.getElementById('logInWindow');

    const [inputUname, setInputUname] = useState('');
    const [inputPword, setInputPword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <div className="container-Login" id="logInWindow">
                <h2 className="headerLogIn">LOG IN</h2>
                <div className="inputUsername">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="username"
                        value={inputUname}
                        onChange={(e) => setInputUname(e.target.value)}
                        />
                </div>
                <div className="inputUsername">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="password"
                        value={inputPword}
                        onChange={(e) => setInputPword(e.target.value)}
                        />
                </div>
                <p className="errorMsg">{errorMessage}</p>
                <div className="btnLogIn">
                    <button onClick={() => {
                        if (inputUname === uName && inputPword === pWord) {
                            onLoginSuccess();
                            logInWind.style.opacity = "0";
                            } else if (inputUname != uName && inputPword === pWord) {
                                setInputUname("");
                                setErrorMessage("Invalid username!");
                                } else if (inputUname === uName && inputPword != pWord) {
                                    setInputPword("");
                                    setErrorMessage("Invalid password!");
                                    }else {
                                        setInputUname("");
                                        setInputPword("");
                                        setErrorMessage("Invalid username or password!");
                                    }

                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    }}>Log In</button>
                </div>
            </div>
        </>
    )
}