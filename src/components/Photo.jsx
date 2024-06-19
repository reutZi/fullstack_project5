import React, { useState } from 'react';

const Photo = ({ photo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(photo.title);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(photo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div style={{ margin: '10px', textAlign: 'center', width: '18%' }}>
      <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginBottom: '5px' }}
          />
          <button onClick={handleSaveClick} style={{ marginLeft: '5px' }}>Save</button>
        </div>
      ) : (
        <p>{photo.title}</p>
      )}
      <button onClick={() => onDelete(photo.id)}>Delete</button>
      {!isEditing && <button onClick={handleUpdateClick} style={{ marginLeft: '5px' }}>Update</button>}
    </div>
  );
};

export default Photo;
