import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Photos from './Photos';
import { AddIcon, ArrowBackIcon } from './Icons';
import '../styles.css';
import { useUser } from '../contexts/AuthContext';

const PhotosPage = () => {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [albumTitle, setAlbumTitle] = useState('');
    const navigate = useNavigate();
    const [maxId, setMaxId] = useState(0);
    const user = useUser();

    useEffect(() => {
        const fetchAlbumTitle = async () => {
            const response = await axios.get(`http://localhost:5000/albums?id=${albumId}`)
            setAlbumTitle(response.data[0].title);
            const res = await axios.get(`http://localhost:5000/photos`);
            let allPhotos = res.data;
            let maxIdFromDB = allPhotos.length > 0 ? Math.max(...allPhotos.map(p => p.id)) : 0;
            setMaxId(maxIdFromDB);
        };
        fetchAlbumTitle();
    }, [albumId]);

    const handleAddPhoto = async () => {
        const title = prompt('Enter photo title');
        if(!title) return;
        const thumbnailUrl = prompt('Enter thumbnail URL');
        if (title && thumbnailUrl) {
            var newId = maxId + 1;
            const response = await axios.post('http://localhost:5000/photos', {
                id: toString(newId),
                title,
                thumbnailUrl,
                albumId: Number(albumId)
            });
            setMaxId(newId);
            if (response.status === 201) {
                alert('Photo added successfully');
                setPhotos([...photos, response.data]);
            } else {
                alert('Failed to add photo');
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">{albumTitle}</h1>
                <div className="flex-container">
                    <button className="button" onClick={handleAddPhoto}>
                        <AddIcon />
                        Add Photo
                    </button>
                    <button className="button" onClick={() => navigate(`/users/${user.id}/albums`)}>
                       <ArrowBackIcon />
                        Back to Albums
                    </button>
                </div>
            </div>
            <Photos albumId={albumId} photos={photos} setPhotos={setPhotos} />
        </div>
    );
};

export default PhotosPage;
