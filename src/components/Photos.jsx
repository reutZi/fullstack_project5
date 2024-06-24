import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowBackIcon, ArrowForwardIcon } from './Icons';
import Photo from './Photo';
import '../styles.css';

const APIURL = 'http://localhost:5000/photos';

const Photos = ({ albumId, photos, setPhotos }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchPhotos = async () => {
        const response = await axios.get(`${APIURL}?albumId=${albumId}&_start=${startIndex}&_limit=8`);
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
            {photos.length === 0 && !loadingMore && (
                <div className="empty-album-message">
                   This album is currently empty. Start adding your favorite photos!
                </div>
            )}
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
           { photos.length > 0 &&
            <div className="flex-container">
                <button onClick={() => setStartIndex(Math.max(0, startIndex - 8))} disabled={startIndex === 0} className="button arrow">
                    <ArrowBackIcon />
                </button>
                <button onClick={() => setStartIndex(startIndex + 8)} disabled={photos.length <8} className="button arrow">
                    <ArrowForwardIcon />
                </button>
            </div>}
            {loadingMore && <div>Loading...</div>}
        </div>
    );
};

export default Photos;
