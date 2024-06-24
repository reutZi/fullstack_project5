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
    const [maxId, setMaxId] = useState(0);
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${API_URL}?userId=${user.id}`);
                    setAlbums(response.data);
                    setFilteredAlbums(response.data);
                    const res = await axios.get(`${API_URL}`);
                    let allAlbums = res.data;
                    let maxIdFromDB = allAlbums.length > 0 ? Math.max(...allAlbums.map(album => album.id)) : 0;
                    setMaxId(maxIdFromDB);
                } catch (error) {
                    console.error('Error fetching albums:', error);
                }
            }
        };
        fetchAlbums();
    }, [user]);

    const handleSelect = (albumId) => {
        navigate(`/users/${user.id}/albums/${albumId}/photos`);
    };

    const handleAdd = async () => {
        const title = prompt('Enter album title');
        if (title) {
            try {
                let newId = maxId + 1;
                const newAlbum = { id: `${newId}`, userId: Number(user.id), title };
                const res2 = await axios.post(API_URL, newAlbum);
                setAlbums(prevAlbums => [...prevAlbums, res2.data]);
                setMaxId(newId);
            } catch (error) {
                console.error('Error adding album:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            // delete all photos associated with the album
            const response = await axios.get(`http://localhost:5000/photos?albumId=${id}`);
            const photosToDelete = response.data;

            if(photosToDelete.length > 0) {
            const deletePromises = photosToDelete.map(photo => {
                return axios.delete(`http://localhost:5000/photos/${photo.id}`);
            });

            Promise.all(deletePromises)
                .then(() => {
                    console.log('All photos from album 98 have been deleted.');
                })
                .catch(error => {
                    console.error('An error occurred while deleting the photos:', error);
                });
            }

            // delete the album itself
            await axios.delete(`${API_URL}/${id}`);

            // Update the state to remove the deleted album
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error deleting album or photos:', error);
        }
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
                            <strong>{album.id + '. ' + album.title}</strong>
                        </div>
                        <div>
                            <button className="icon-button" onClick={(event) => { event.stopPropagation(); handleUpdate(album.id) }}>
                                <EditIcon />
                            </button>
                            <button className="icon-button" onClick={(event) => { event.stopPropagation(); handleDelete(album.id) }}>
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
