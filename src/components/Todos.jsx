import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Search from './Search';
import { AddIcon, DeleteIcon, EditIcon } from './Icons';
import '../styles.css';

const API_URL = 'http://localhost:5000/todos';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [criteria, setCriteria] = useState('serial');
    const user = useUser();

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`${API_URL}?userId=${user.id}`);
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const handleAdd = async () => {
        const title = prompt('Enter todo title');
        if (title) {
            const response = await axios.post(`${API_URL}`, { title, completed: false, userId: user.id });
            setTodos([...todos, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleUpdate = async (id) => {
        let todo = todos.find(todo => todo.id === id);
        const title = prompt("Update the ToDo", todo.title);
        if (title) {
            const response = await axios.put(`${API_URL}/${id}`, { ...todos.find(todo => todo.id === id), title });
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        }
    };

    const handleToggle = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        const response = await axios.put(`${API_URL}/${id}`, { ...todo, completed: !todo.completed });
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    };

    const sortedTodos = filteredTodos.sort((a, b) => {
        if (criteria === 'serial') return a.id - b.id;
        if (criteria === 'alphabetical') return a.title.localeCompare(b.title);
        if (criteria === 'execution') return a.completed - b.completed;
        return 0;
    });

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Todos</h1>
                <div className="flex-container">
                    <Search features={[["title", "Title"], ["id", "ToDo Number"], ["checked", "Completed"], ["unchecked", "Not Completed"]]} list={todos} setFilteredList={setFilteredTodos} />
                    <select
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                        className="search-select"
                    >
                        <option value="serial">Serial</option>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="execution">Execution Status</option>
                    </select>
                    <button className="button" onClick={handleAdd}>
                        <AddIcon />
                        Add Todo
                    </button>
                </div>
            </div>
            <ul className="list">
                {sortedTodos.map(todo => (
                    <li key={todo.id} className="list-item">
                        <label>
                            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
                                {todo.id + '.  ' + todo.title}
                            </span>
                        </label>
                        <div>
                            <button className="icon-button" onClick={() => handleUpdate(todo.id)}>
                                <EditIcon />
                            </button>
                            <button className="icon-button" onClick={() => handleDelete(todo.id)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
