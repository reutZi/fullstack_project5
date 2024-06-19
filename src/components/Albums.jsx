// src/components/Albums.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Photos from "./Photos";
import AuthContext from '../contexts/AuthContext';

const API_URL = 'http://localhost:5000/albums';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [search, setSearch] = useState('');
    const user = useContext(AuthContext);

    const fetchAlbums = async () => {
        const response = await axios.get(`${API_URL}?userId=${user.id}`);
        setAlbums(response.data);
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    const handleSelect = async (album) => {
        setSelectedAlbum(album);
    };

    const handleAdd = async () => {
        const title = prompt('Enter album title');
        if (title) {
            const response = await axios.post(`${API_URL}`, { title, userId: user.id });
            setAlbums([...albums, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setAlbums(albums.filter(album => album.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new album title');
        if (title) {
            const response = await axios.put(`${API_URL}/${id}`, { ...albums.find(album => album.id === id), title });
            setAlbums(albums.map(album => (album.id === id ? response.data : album)));
        }
    };

    const handleAddPhoto = async () => {
        const title = prompt('Enter photo title');
        const url = prompt('Enter photo URL');
        const thumbnailUrl = prompt('Enter thumbnail URL');
        if (title && url && thumbnailUrl) {
            const response = await axios.post('http://localhost:5000/photos', { title, url, thumbnailUrl, albumId: selectedAlbum.id });
            if (response.status === 201) {
                alert('Photo added successfully');
            }else{
                alert('Failed to add photo');
            }
        }
    };

    const filteredAlbums = albums.filter(album => album.title.includes(search));

    return (
        <div>
            <h1>Albums</h1>
            <div>
                <button onClick={handleAdd}>Add Album</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search albums" />
            </div>
            <ul>
                {filteredAlbums.map(album => (
                    <li key={album.id} onClick={() => handleSelect(album)}>
                        {album.title}
                        <button onClick={() => handleUpdate(album.id)}>Update</button>
                        <button onClick={() => handleDelete(album.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedAlbum && (
                <div>
                    <h2>{selectedAlbum.title}</h2>
                    <h3>Photos</h3>
                    <Photos albumId={selectedAlbum.id}/>
                    <button onClick={handleAddPhoto}>Add Photo</button>
                </div>
            )}
        </div>
    );
};

export default Albums;
