import React, { useState } from 'react';
import '../styles.css';
import { DeleteIcon, EditIcon } from './Icons';

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

    const handleCancelClick = () => {
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
                {isEditing &&
                    <div>
                    <button onClick={handleSaveClick} className="icon-button">Save</button>
                    <button onClick={handleCancelClick} className="icon-button">Cancel</button>
                    </div>}
                {!isEditing && 
                <div>
                <button onClick={handleUpdateClick} className="icon-button">
                    <EditIcon />
                </button>
                <button onClick={() => onDelete(photo.id)} className="icon-button">
                    <DeleteIcon />
                </button>
                </div>}
            </div>
        </div>
    );
};

export default Photo;
