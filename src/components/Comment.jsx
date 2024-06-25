import axios from 'axios';
import React from 'react';
import '../styles.css';
import { DeleteIcon, EditIcon} from './Icons';
import { useUser } from '../contexts/AuthContext';


const API_URL = 'http://localhost:5000/comments';

const Comment = ({ comment, comments, setComments }) => {
    
    const user = useUser();
    const handleDeleteComment = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setComments(comments.filter(comment => comment.id !== id));
        }
        catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleUpdateComment = async (id) => {
        const body = prompt('Enter new comment body', comments.find(com => com.id === id).body);

        if (!body) return;
        const response = await axios.put(`${API_URL}/${id}`, { ...comments.find(comment => comment.id === id), body });
        setComments(comments.map(comment => (comment.id === id ? response.data : comment)));
    };

    return (
        <div className="comment-container">
            {comment.body}
            {(user.id === comment.userID) && <button className="icon-button" onClick={() => handleUpdateComment(comment.id)}><EditIcon/></button>}
            {(user.id === comment.userID) && <button className="icon-button" onClick={() => handleDeleteComment(comment.id)}><DeleteIcon/></button>}
        </div>
    );
};

export default Comment;
