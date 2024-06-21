import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Photos from './Photos';
import { AddIcon } from './Icons';
import '../styles.css';

const PhotosPage = () => {
    const { albumId } = useParams();
    const [albumTitle, setAlbumTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbumTitle = async () => {
            const response = await axios.get(`http://localhost:5000/albums/${albumId}`);
            setAlbumTitle(response.data.title);
        };
        fetchAlbumTitle();
    }, [albumId]);

    const handleAddPhoto = async () => {
        const title = prompt('Enter photo title');
        const thumbnailUrl = prompt('Enter thumbnail URL');
        if (title && thumbnailUrl) {
            const response = await axios.post('http://localhost:5000/photos', {
                title,
                thumbnailUrl,
                albumId
            });
            if (response.status === 201) {
                alert('Photo added successfully');
                window.location.reload(); // To refresh and show the new photo
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
                    <button className="button" onClick={() => navigate('/albums')}>
                        Back to Albums
                    </button>
                </div>
            </div>
            <Photos albumId={albumId} />
        </div>
    );
};

export default PhotosPage;
