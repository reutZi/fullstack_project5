import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Typography, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        let todo = todos.find(todo => todo.id === id);
        const title = prompt("Update the ToDo", todo.title);
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
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>Todos</Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Todo</Button>
                <Select
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    variant="outlined"
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="serial">Serial</MenuItem>
                    <MenuItem value="alphabetical">Alphabetical</MenuItem>
                    <MenuItem value="execution">Execution Status</MenuItem>
                </Select>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search todos"
                    variant="outlined"
                />
            </Box>
            <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                {sortedTodos.map(todo => (
                    <Box component="li" key={todo.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                        <IconButton color="secondary" onClick={() => handleUpdate(todo.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(todo.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <FormControlLabel
                            control={<Checkbox checked={todo.completed} onChange={() => handleToggle(todo.id)} />}
                            label={
                                <Typography
                                    onClick={() => handleToggle(todo.id)}
                                    sx={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                                >
                                    {todo.title}
                                </Typography>
                            }
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Todos;
