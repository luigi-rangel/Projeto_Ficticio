import { useEffect } from 'react';

import SignUp from '../../SignUp';
import SignIn from '../../SignIn';

import './styles.css';

export default function Home() {
    useEffect(() => {
        document.title = 'Projeto Fictício';
    }, []);
    
    return (
        <>
            <h1>Projeto Fictício</h1>
            <div className="flexbox">
                <SignUp/>
                <SignIn/>
            </div>
        </>
    );
};