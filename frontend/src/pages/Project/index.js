import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import './styles.css';

export default function Project(){
    const location = useLocation();
    const navigate = useNavigate();

    const { user, proj } = location.state;

    const [project, setProject] = useState();
    const [mode, setMode] = useState();
    const [view, setView] = useState(true);

    const title = useRef();
    const zip_code = useRef();
    const cost = useRef();
    const deadlineDate = useRef();
    const deadlineTime = useRef();

    const parseDate = date => {
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    };

    const parseTime = date => {
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);

        return hour + ':' + minute;
    };

    const getProjectByID = id => {
        api.get(`project?id=${id}`, {
            headers: {
                username: user.username
            }
        })
        .then(res => {
            setProject(res.data.data[0]);
        })
        .catch(e => console.error(e));
    };

    useEffect(() => {
        document.title = proj.title + ` - ${view ? 'Detalhes' : 'Editar'}`;
        getProjectByID(proj.id);
    }, []);

    const updated_at = project?.updated_at != null ? new Date(project?.updated_at).toLocaleString() : '-';

    const projectView = () => {
        return (
            <>
                <h3><b>{project?.title}</b></h3>
                <p><b>Local:</b> {project?.location}</p>
                <p><b>Custo:</b> {project?.cost.toLocaleString('pt-BR', {
                                        style: "currency",
                                        currency: "BRL"
                                    })}</p>
                <p><b>Prazo:</b> {new Date(project?.deadline).toLocaleString()}</p>
                <p><b>Data de criação:</b> {new Date(project?.created_at).toLocaleString()}</p>
                <p><b>Modificado por último:</b> {updated_at}</p>
                <p><b>Concluído:</b> {project?.done ? '✅' : '❌'}</p>
                <div className='buttons'>
                    <button onClick={() => navigate(-1)}>Voltar</button>
                    <button onClick={() => setView(false)}>Editar</button>
                    <button onClick={() => deleteProject(project.id)}>Deletar projeto</button>
                </div>
            </>
        );
    };

    const projectEdit = () => {
        return (
            <>
                <h3><input type="text" defaultValue={project?.title} ref={title}></input></h3>
                <p><b>CEP:</b> <input type="text" defaultValue={proj.zip_code} ref={zip_code}></input></p>
                <p><b>Custo:</b> <input type="number" defaultValue={project?.cost} ref={cost}></input></p>
                <p><b>Prazo:</b> <input type="date" defaultValue={parseDate(new Date(project?.deadline))} ref={deadlineDate}></input><input type="time" defaultValue={parseTime(new Date(project?.deadline))} ref={deadlineTime}></input></p>
                <p><b>Data de criação:</b> {new Date(project?.created_at).toLocaleString()}</p>
                <p><b>Modificado por último:</b> {updated_at}</p>
                {project?.done ? (
                    <>
                        <p><b>Concluído:</b> ✅</p>
                        <div className='buttons'>
                            <button onClick={() => setView(true)}>Voltar</button>
                            <button onClick={() => updateProject(proj.id)}>Salvar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='buttons'>
                            <button onClick={() => setView(true)}>Voltar</button>
                            <button onClick={() => done(project.id)}>Concluir Projeto</button>
                            <button onClick={() => updateProject(proj.id)}>Salvar</button>
                        </div>
                    </>
                )}
            </>
        );
    };

    const updateProject = (id) => {
        if(deadlineDate.current.value === '') return;
        const data = {
            title: title.current.value,
            zip_code: zip_code.current.value.split('-').join(''),
            cost: cost.current.value,
            deadline: new Date(deadlineDate.current.value + ' ' + deadlineTime.current.value)
        }

        api.put(`/projects/${id}`, data, {
            headers: {
                username: user.username
            }
        })
        .then(() => {
            getProjectByID(id);
            setView(true);
        })
        .catch(e => console.error(e));
    };

    const deleteProject = (id) => {
        api.delete(`/projects/${id}`, {
            headers: {
                username: user.username
            }
        })
        .then(() => navigate('/projects', {state: {user: user}}))
    };

    useEffect(() => {
        setMode(view ? projectView() : projectEdit())
    }, [view, project]);

    const done = (id) => {
        api.request(`/projects/${id}/done`, {
            method: 'PATCH',
            headers: {
                username: user.username
            }
        })
        .then(() => {
            getProjectByID(id);
            setView(true);
        })
        .catch(e => console.error(e))
    };

    return (
        <>
            <div className='projectBox'>
                {mode}
            </div>
        </>
    );
}