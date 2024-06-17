
import NavBar from './NavBar';
import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';




function Comment({ comment, comments, setComments }) {


    const handleDeleteComment = async (id) => {
        await axios.delete(`http://localhost:5000/comments/${id}`);
        setComments(comments.filter(comment => comment.id !== id));
    };
    
    const handleUpdateComment = async (id) => {
        const body = prompt('Enter new comment body', comments.find(com => com.id === id).body);
        if (body) {
            const response = await axios.put(`http://localhost:5000/comments/${id}`, { ...comments.find(comment => comment.id === id), body });
            setComments(comments.map(comment => (comment.id === id ? response.data : comment)));
        }
    };

    return (
        <div>
            {comment.body}
            <button onClick={() => handleUpdateComment(comment.id)}>Update</button>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
        </div>
    );
}

export default Comment;
