import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Table from 'react-bootstrap/Table';

export default function Projects(){
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state;
    const [projects, setProjects] = useState([]);

    const title = useRef();
    const zip_code = useRef();
    const cost = useRef();
    const deadlineDate = useRef();
    const deadlineTime = useRef();
    
    const getProjects = () => {
        api.get('/projects', {
            headers: {
                username: user.username
            }
        })
        .then(res => setProjects(res.data.data))
        .catch(e => console.error(e));
    }
    
    useEffect(() => {
        getProjects();
    }, []);
    
    const done = (id) => {
        api.request(`/projects/${id}/done`, {
            method: 'PATCH',
            headers: {
                username: user.username
            }
        })
        .then(() => getProjects())
        .catch(e => console.error(e))
    };

    const createProject = () => {
        if(deadlineDate.current.value === '') return;
        const data = {
            title: title.current.value,
            zip_code: zip_code.current.value.split('-').join(''),
            cost: cost.current.value,
            deadline: new Date(deadlineDate.current.value + ' ' + deadlineTime.current.value)
        }
        
        api.post('/project', data, {
            headers: {
                username: user.username
            }
        })
        .then(() => getProjects())
        .catch(e => console.error(e));
    }
    
    return (
        <>
            <h1>Seus Projetos</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>CEP</th>
                        <th>Custo</th>
                        <th>Prazo</th>
                        <th>Feito</th>
                        <th>Data de criação</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((item, ind) => {
                        return (
                            <tr key={ind}>
                                <td onClick={() => navigate('/project', {state: {proj: item, user: user}})}>{item.title}</td>
                                <td onClick={() => navigate('/project', {state: {proj: item, user: user}})}>{item.zip_code.substring(0, 5) + '-' + item.zip_code.substring(5)}</td>
                                <td onClick={() => navigate('/project', {state: {proj: item, user: user}})}>{item.cost}</td>
                                <td onClick={() => navigate('/project', {state: {proj: item, user: user}})}>{new Date(item.deadline).toLocaleString()}</td>
                                <td onClick={() => done(item.id)}>{item.done ? '✅' : '❌'}</td> 
                                <td onClick={() => navigate('/project', {state: {proj: item, user: user}})}>{new Date(item.created_at).toLocaleString()}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td><input type="text" ref={title}></input></td>
                        <td><input type="text" ref={zip_code}></input></td>
                        <td><input type="number" ref={cost}></input></td>
                        <td><input type="date" ref={deadlineDate}></input><input type="time" ref={deadlineTime}></input></td>
                        <td><button onClick={createProject}>Criar</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}