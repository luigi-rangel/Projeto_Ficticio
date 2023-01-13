import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './services/api';

export default function SignUp(){
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [message, setMessage] = useState(null);

    const name = useRef();
    const username = useRef();
    const password = useRef();

    const signUp = () => {
        const user = {
            name: name.current.value,
            username: username.current.value,
            password: password.current.value
        };

        api.post('/users', user)
            .then(() => {
                setMessage((<p>Usuário criado!</p>));
                setUser({name: user.name, username: user.username});
            })
            .catch(e => {
                if(e.response.status === 422) setMessage(`Outro usuário já possui o apelido '${user.username}'.`);
                else if(e.response.status === 400) setMessage((<p>Verifique se todos os campos estão preenchidos!</p>));
                else console.error(e.message);
        });
    };

    useEffect(() => {
        if(user) navigate('/projects', {state: {user: user}});
    }, [user]);

    return (
        <div>
            <h2>Criar usuário</h2>
            <p>{message}</p>
            <div className='input'>
                <input type="text" placeholder="Nome" ref={name}></input>
                <input type="text" placeholder='Usuário' ref={username}></input>
                <input type="password" placeholder='Senha' ref={password}></input>
            </div>
            <button onClick={signUp}>Criar novo usuário</button>
        </div>
    );
}