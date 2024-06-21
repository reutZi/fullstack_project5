import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowBackIcon, ArrowForwardIcon } from './Icons';
import Photo from './Photo';
import '../styles.css';

const APIURL = 'http://localhost:5000/photos';

const Photos = ({ albumId }) => {
    const [photos, setPhotos] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchPhotos = async () => {
        const response = await axios.get(`${APIURL}?albumId=${albumId}&_start=${startIndex}&_limit=10`);
        setPhotos(response.data);
        setLoadingMore(false);
    };

    useEffect(() => {
        setLoadingMore(true);
        fetchPhotos();
    }, [albumId, startIndex]);

    const handleDeletePhoto = async (photoId) => {
        await axios.delete(`${APIURL}/${photoId}`);
        const updatedPhotos = photos.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos);
    };

    const handleUpdatePhotoTitle = (photoId, newTitle) => {
        axios.patch(`${APIURL}/${photoId}`, { title: newTitle });
        const updatedPhotos = photos.map(photo =>
            photo.id === photoId ? { ...photo, title: newTitle } : photo
        );
        setPhotos(updatedPhotos);
    };

    return (
        <div>
            <div className="grid-container">
                {photos.map(photo => (
                    <Photo
                        key={photo.id}
                        photo={photo}
                        onDelete={handleDeletePhoto}
                        onUpdate={handleUpdatePhotoTitle}
                    />
                ))}
            </div>
            <div className="flex-container">
                <button onClick={() => setStartIndex(Math.max(0, startIndex - 10))} disabled={startIndex === 0} className="button">
                    <ArrowBackIcon />
                </button>
                <button onClick={() => setStartIndex(startIndex + 10)} disabled={photos.length < 10} className="button">
                    <ArrowForwardIcon />
                </button>
            </div>
            {loadingMore && <div>Loading...</div>}
        </div>
    );
};

export default Photos;
