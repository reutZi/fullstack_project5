import React, { useState } from 'react';
import '../styles.css';

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
        <div className="card">
            <img src={photo.thumbnailUrl} alt={photo.title} className="card-media" />
            <div className="card-content">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="input"
                    />
                ) : (
                    <h3 className="card-title">{photo.title}</h3>
                )}
            </div>
            <div className="card-actions">
                {isEditing ? (
                    <button onClick={handleSaveClick} className="button">Save</button>
                ) : (
                    <button onClick={handleUpdateClick} className="button">Update</button>
                )}
                <button onClick={() => onDelete(photo.id)} className="button">Delete</button>
            </div>
        </div>
    );
};

export default Photo;
