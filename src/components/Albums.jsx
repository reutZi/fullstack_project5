// src/components/Albums.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAlbums = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:5000/albums?userId=${user.id}`);
            setAlbums(response.data);
        };
        fetchAlbums();
    }, []);

    const handleSelect = async (album) => {
        setSelectedAlbum(album);
        const response = await axios.get(`http://localhost:5000/photos?albumId=${album.id}`);
        setPhotos(response.data);
    };

    const handleAdd = async () => {
        const title = prompt('Enter album title');
        if (title) {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.post('http://localhost:5000/albums', { title, userId: user.id });
            setAlbums([...albums, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/albums/${id}`);
        setAlbums(albums.filter(album => album.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new album title');
        if (title) {
            const response = await axios.put(`http://localhost:5000/albums/${id}`, { ...albums.find(album => album.id === id), title });
            setAlbums(albums.map(album => (album.id === id ? response.data : album)));
        }
    };

    const handleAddPhoto = async () => {
        const title = prompt('Enter photo title');
        const url = prompt('Enter photo URL');
        const thumbnailUrl = prompt('Enter thumbnail URL');
        if (title && url && thumbnailUrl) {
            const response = await axios.post('http://localhost:5000/photos', { title, url, thumbnailUrl, albumId: selectedAlbum.id });
            setPhotos([...photos, response.data]);
        }
    };

    const handleDeletePhoto = async (id) => {
        await axios.delete(`http://localhost:5000/photos/${id}`);
        setPhotos(photos.filter(photo => photo.id !== id));
    };

    const handleUpdatePhoto = async (id) => {
        const title = prompt('Enter new photo title');
        const url = prompt('Enter new photo URL');
        const thumbnailUrl = prompt('Enter new thumbnail URL');
        if (title && url && thumbnailUrl) {
            const response = await axios.put(`http://localhost:5000/photos/${id}`, { ...photos.find(photo => photo.id === id), title, url, thumbnailUrl });
            setPhotos(photos.map(photo => (photo.id === id ? response.data : photo)));
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
                    <ul>
                        {photos.map(photo => (
                            <li key={photo.id}>
                                {photo.title}
                                <button onClick={() => handleUpdatePhoto(photo.id)}>Update</button>
                                <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAddPhoto}>Add Photo</button>
                </div>
            )}
        </div>
    );
};

export default Albums;
