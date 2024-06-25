import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Comment from './Comment';
import {CommentIcon} from './Icons';

import '../styles.css';

const Comments = ({postId}) => {

    const [comments, setComments] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const user = useUser();
    const API_URL = 'http://localhost:5000/comments';

    useEffect(() => {
        if (!user) return;

        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:5000/comments?postId=${postId}`);
            setComments(response.data);
        };
        try{
            fetchComments();
        }
        catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [user]);

    const viewComments = () => { setCommentsOpen(true) };

    const handleClose = () => {
        setCommentsOpen(false);
        return null;
    }

    const handleAddComment = async () => {
        const body = prompt('Enter comment');
        if (body) {
            try{
               // let newId = maxId + 1;

                const response = await axios.post(API_URL, { body, postId: postId, name: user.username, email: user.email, userID: user.id});
                setComments([...comments, response.data]);
            }
            catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };


    return (
        <div className="container">
            <button className="button" onClick={handleAddComment}>
                <CommentIcon />
                Add Comment
            </button>
            {!commentsOpen&&<h3 onClick={viewComments} style={{ cursor: 'pointer', marginTop: '20px' }}>View Comments</h3>}
            {commentsOpen &&
            <div>
            <h3 onClick={handleClose} style={{ cursor: 'pointer', marginTop: '20px' }}>Comments:</h3>
            {comments.length==0 && <h3 onClick={handleClose}>No comments yet</h3>}
            <ul className="list">
                {comments.map(com => (
                    <li key={com.id} className="list-item">
                        <Comment comment={com} comments={comments} setComments={setComments} />
                    </li>
                ))}
            </ul>
            </div>}
        </div>
    );
};

export default Comments;
