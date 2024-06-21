import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import { AddIcon, DeleteIcon, EditIcon } from './Icons';
import '../styles.css';

const API_URL = 'http://localhost:5000/albums';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${API_URL}?userId=${user.id}`);
                    setAlbums(response.data);
                    setFilteredAlbums(response.data);
                } catch (error) {
                    console.error('Error fetching albums:', error);
                }
            }
        };
        fetchAlbums();
    }, [user]);

    const handleSelect = (albumId) => {
        navigate(`/albums/${albumId}/photos`);
    };

    const handleAdd = async () => {
        const title = prompt('Enter album title');
        if (title) {
            const response = await axios.post(API_URL, { title, userId: user.id });
            setAlbums([...albums, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setAlbums(albums.filter(album => album.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new album title', albums.find(album => album.id === id).title);
        if (title) {
            const response = await axios.put(`${API_URL}/${id}`, { title });
            setAlbums(albums.map(album => (album.id === id ? response.data : album)));
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Albums</h1>
                <div className="flex-container">
                    <Search features={[["title", "Title"], ["id", "Album Number"]]} list={albums} setFilteredList={setFilteredAlbums} />
                    <button className="button" onClick={handleAdd}>
                        <AddIcon />
                        Add Album
                    </button>
                </div>
            </div>
            <ul className="list">
                {filteredAlbums.map(album => (
                    <li key={album.id} className="list-item" onClick={() => handleSelect(album.id)}>
                        <div>
                            <strong>{album.title}</strong>
                            <br />
                            ID: {album.id}
                        </div>
                        <div>
                            <button className="icon-button" onClick={() => handleUpdate(album.id)}>
                                <EditIcon />
                            </button>
                            <button className="icon-button" onClick={() => handleDelete(album.id)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Albums;
