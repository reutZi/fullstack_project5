// src/components/Todos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [criteria, setCriteria] = useState('serial');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('http://localhost:5000/todos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const handleAdd = async () => {
        const title = prompt('Enter todo title');
        if (title) {
            const response = await axios.post('http://localhost:5000/todos', { title, completed: false });
            setTodos([...todos, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new todo title');
        if (title) {
            const response = await axios.put(`http://localhost:5000/todos/${id}`, { ...todos.find(todo => todo.id === id), title });
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        }
    };

    const handleToggle = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        const response = await axios.put(`http://localhost:5000/todos/${id}`, { ...todo, completed: !todo.completed });
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    };

    const filteredTodos = todos.filter(todo => todo.title.includes(search));
    const sortedTodos = filteredTodos.sort((a, b) => {
        if (criteria === 'serial') return a.id - b.id;
        if (criteria === 'alphabetical') return a.title.localeCompare(b.title);
        if (criteria === 'execution') return a.completed - b.completed;
        return 0;
    });

    return (
        <div>
            <h1>Todos</h1>
            <div>
                <button onClick={handleAdd}>Add Todo</button>
                <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
                    <option value="serial">Serial</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="execution">Execution Status</option>
                </select>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search todos" />
            </div>
            <ul>
                {sortedTodos.map(todo => (
                    <li key={todo.id}>
                        <span onClick={() => handleToggle(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.title}
                        </span>
                        <button onClick={() => handleUpdate(todo.id)}>Update</button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
