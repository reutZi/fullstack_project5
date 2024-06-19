import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photo from './Photo';

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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photos.map(photo => (
          <Photo
            key={photo.id}
            photo={photo}
            onDelete={handleDeletePhoto}
            onUpdate={handleUpdatePhotoTitle}
          />
        ))}
      </div>
      <button onClick={() => setStartIndex(startIndex + 10)} >
        Load More
      </button>
      {loadingMore && <p>Loading photos...</p>}
    </div>
  );
};

export default Photos;
