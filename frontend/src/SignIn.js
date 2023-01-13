import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './services/api';

export default function SignUp(){
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    const username = useRef();
    const password = useRef();

    const signIn = () => {
        const u = {
            username: username.current.value,
            password: password.current.value
        };

        api.get('/user', { params: u})
            .then(res => setUser(res.data.data[0]))
            .catch(e => {
                if(e.response.status === 404) setMessage((<p>Não foi possível logar. Verifique usuário e senha.</p>));
                else if(e.response.status === 400);
                else console.log(e.message);
            });
    };

    useEffect(() => {
        if(user) navigate('/projects', {state: {user: user}});
    }, [user]);

    return (
        <div>
            <h2>Logar usuário</h2>
            {message}
            <input type="text" placeholder='Usuário' ref={username}></input>
            <input type="password" placeholder='Senha' ref={password}></input>
            <button onClick={signIn} className="botao">Logar</button>
        </div>
    );
}