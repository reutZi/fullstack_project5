import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APIURL = 'https://jsonplaceholder.typicode.com/photos';

const Photos = ({ albumId }) => {
  const [photos, setPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0); 
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
        const response = await axios.get(`${APIURL}?albumId=${albumId}&_start=${startIndex}&_limit=10`);
        setPhotos(response.data);
        console.log(response.data);
    }
    fetchPhotos();
  }, [albumId, startIndex]);

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    setPhotos(updatedPhotos);
  };

  const handleUpdatePhotoTitle = (photoId) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId ? { ...photo, title: newTitle } : photo
    );
    setPhotos(updatedPhotos);
    setNewTitle('');
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photos.map(photo => (
          <div key={photo.id} style={{ margin: '10px', textAlign: 'center', width: '18%' }}>
            <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            <p>{photo.title}</p>
            <br />
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
            <button onClick={() => handleUpdatePhotoTitle(photo.id)} style={{ marginLeft: '5px' }}>Update</button>
          </div>
        ))}
      </div>
      <button onClick={() => setStartIndex(startIndex + 10)} style={{ marginTop: '20px' }}>Load More</button>
    </div>
  );
};

export default Photos;
